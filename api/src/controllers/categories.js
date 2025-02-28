import { Op } from 'sequelize';
import { Category } from '../models/index.js';

export const getCategories = async (req, res) => {
  try {
    const { search } = req.query;
    const where = { isActive: true };

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const categories = await Category.findAll({
      where,
      order: [['name', 'ASC']],
    });

    res.json(categories);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({
      where: { id, isActive: true },
    });

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.json(category);
  } catch (error) {
    console.error('Error al obtener categoría:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existingCategory = await Category.findOne({
      where: { name, isActive: true },
    });

    if (existingCategory) {
      return res.status(400).json({
        message: 'Ya existe una categoría con ese nombre',
      });
    }

    const category = await Category.create({
      name,
      description,
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await Category.findOne({
      where: { id, isActive: true },
    });

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    if (name !== category.name) {
      const existingCategory = await Category.findOne({
        where: {
          name,
          id: { [Op.ne]: id },
          isActive: true,
        },
      });

      if (existingCategory) {
        return res.status(400).json({
          message: 'Ya existe una categoría con ese nombre',
        });
      }
    }

    await category.update({ name, description });

    res.json(category);
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({
      where: { id, isActive: true },
    });

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    await category.update({ isActive: false });

    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}; 