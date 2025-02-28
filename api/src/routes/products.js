import express from 'express';
import { Product, Category } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all products with their categories
router.get('/', authenticate, async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, as: 'category' }]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single product
router.get('/:id', authenticate, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: 'category' }]
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new product
router.post('/', authenticate, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a product
router.put('/:id', authenticate, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a product
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 