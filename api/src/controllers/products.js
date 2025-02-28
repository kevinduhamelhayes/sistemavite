import { Op } from 'sequelize';
import { Product, Category } from '../models/index.js';

export const getProducts = async (req, res) => {
  try {
    const { search, categoryId } = req.query;
    const where = { isActive: true };

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
        { barcode: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    const products = await Product.findAll({
      where,
      include: [
        {
          model: Category,
          attributes: ['id', 'name'],
        },
      ],
      order: [['name', 'ASC']],
    });

    res.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: { id, isActive: true },
      include: [
        {
          model: Category,
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, minStock, barcode, categoryId } = req.body;

    if (barcode) {
      const existingProduct = await Product.findOne({
        where: { barcode, isActive: true },
      });

      if (existingProduct) {
        return res.status(400).json({
          message: 'Ya existe un producto con ese código de barras',
        });
      }
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      minStock,
      barcode,
      categoryId,
    });

    const productWithCategory = await Product.findByPk(product.id, {
      include: [
        {
          model: Category,
          attributes: ['id', 'name'],
        },
      ],
    });

    res.status(201).json(productWithCategory);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, minStock, barcode, categoryId } = req.body;

    const product = await Product.findOne({
      where: { id, isActive: true },
    });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (barcode && barcode !== product.barcode) {
      const existingProduct = await Product.findOne({
        where: {
          barcode,
          id: { [Op.ne]: id },
          isActive: true,
        },
      });

      if (existingProduct) {
        return res.status(400).json({
          message: 'Ya existe un producto con ese código de barras',
        });
      }
    }

    await product.update({
      name,
      description,
      price,
      stock,
      minStock,
      barcode,
      categoryId,
    });

    const updatedProduct = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ['id', 'name'],
        },
      ],
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: { id, isActive: true },
    });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await product.update({ isActive: false });

    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const product = await Product.findOne({
      where: { id, isActive: true },
    });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const newStock = product.stock + quantity;
    
    if (newStock < 0) {
      return res.status(400).json({
        message: 'No hay suficiente stock disponible',
      });
    }

    await product.update({ stock: newStock });

    res.json({ message: 'Stock actualizado correctamente', stock: newStock });
  } catch (error) {
    console.error('Error al actualizar stock:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}; 