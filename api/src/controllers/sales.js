import { Op } from 'sequelize';
import { Sale, SaleItem, Product, User, Category } from '../models/index.js';
import sequelize from '../config/database.js';

export const getSales = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const where = {};

    if (startDate && endDate) {
      where.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    const sales = await Sale.findAll({
      where,
      include: [
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'username'],
        },
        {
          model: SaleItem,
          as: 'items',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['id', 'name', 'price'],
              include: [
                {
                  model: Category,
                  as: 'category',
                  attributes: ['id', 'name'],
                },
              ],
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(sales);
  } catch (error) {
    console.error('Error al obtener ventas:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await Sale.findByPk(id, {
      include: [
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'username'],
        },
        {
          model: SaleItem,
          as: 'items',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['id', 'name', 'price'],
              include: [
                {
                  model: Category,
                  as: 'category',
                  attributes: ['id', 'name'],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!sale) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }

    res.json(sale);
  } catch (error) {
    console.error('Error al obtener venta:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const createSale = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { items, paymentMethod } = req.body;
    const sellerId = req.user.id;

    // Verificar stock y calcular total
    let total = 0;
    const productsToUpdate = [];
    const saleItems = [];

    for (const item of items) {
      const product = await Product.findOne({
        where: { id: item.productId, isActive: true },
        transaction: t,
      });

      if (!product) {
        throw new Error(`Producto ${item.productId} no encontrado`);
      }

      if (product.stock < item.quantity) {
        throw new Error(
          `Stock insuficiente para el producto ${product.name}`
        );
      }

      const subtotal = parseFloat(product.price) * item.quantity;
      total += subtotal;

      productsToUpdate.push({
        product,
        quantity: item.quantity,
      });

      saleItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
        subtotal,
      });
    }

    // Crear la venta
    const sale = await Sale.create(
      {
        total,
        paymentMethod,
        sellerId,
      },
      { transaction: t }
    );

    // Crear los items de la venta
    await Promise.all(
      saleItems.map((item) =>
        SaleItem.create(
          {
            ...item,
            saleId: sale.id,
          },
          { transaction: t }
        )
      )
    );

    // Actualizar stock
    await Promise.all(
      productsToUpdate.map(({ product, quantity }) =>
        product.update(
          {
            stock: product.stock - quantity,
          },
          { transaction: t }
        )
      )
    );

    await t.commit();

    const saleWithDetails = await Sale.findByPk(sale.id, {
      include: [
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'username'],
        },
        {
          model: SaleItem,
          as: 'items',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['id', 'name', 'price'],
              include: [
                {
                  model: Category,
                  as: 'category',
                  attributes: ['id', 'name'],
                },
              ],
            },
          ],
        },
      ],
    });

    res.status(201).json(saleWithDetails);
  } catch (error) {
    await t.rollback();
    console.error('Error al crear venta:', error);
    res.status(400).json({ message: error.message });
  }
};

export const cancelSale = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;

    const sale = await Sale.findByPk(id, {
      include: [
        {
          model: SaleItem,
          as: 'items',
        },
      ],
      transaction: t,
    });

    if (!sale) {
      throw new Error('Venta no encontrada');
    }

    if (sale.status === 'cancelled') {
      throw new Error('La venta ya está cancelada');
    }

    // Restaurar stock
    await Promise.all(
      sale.items.map((item) =>
        Product.increment(
          { stock: item.quantity },
          {
            where: { id: item.productId },
            transaction: t,
          }
        )
      )
    );

    // Actualizar estado de la venta
    await sale.update(
      { status: 'cancelled' },
      { transaction: t }
    );

    await t.commit();

    res.json({ message: 'Venta cancelada correctamente' });
  } catch (error) {
    await t.rollback();
    console.error('Error al cancelar venta:', error);
    res.status(400).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const where = {};

    if (startDate && endDate) {
      where.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    where.status = 'completed';

    const [totalSales, totalProducts, averageSale, totalTransactions, dailySales] =
      await Promise.all([
        // Total de ventas
        Sale.sum('total', { where }),

        // Total de productos vendidos
        SaleItem.sum('quantity', {
          include: [
            {
              model: Sale,
              as: 'sale',
              where,
            },
          ],
        }),

        // Promedio de venta
        Sale.findOne({
          attributes: [[sequelize.fn('AVG', sequelize.col('total')), 'average']],
          where,
          raw: true,
        }),

        // Total de transacciones
        Sale.count({ where }),

        // Ventas diarias
        Sale.findAll({
          attributes: [
            [sequelize.fn('date', sequelize.col('createdAt')), 'date'],
            [sequelize.fn('sum', sequelize.col('total')), 'total'],
          ],
          where,
          group: [sequelize.fn('date', sequelize.col('createdAt'))],
          order: [[sequelize.fn('date', sequelize.col('createdAt')), 'ASC']],
          raw: true,
        }),
      ]);

    res.json({
      totalSales: totalSales || 0,
      totalProducts: totalProducts || 0,
      averageSale: averageSale.average || 0,
      totalTransactions,
      dailySales: dailySales.map((sale) => ({
        date: sale.date,
        total: parseFloat(sale.total),
      })),
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}; 