import express from 'express';
import { User } from '../models/index.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    
    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Crear usuario
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role
    });

    // Enviar respuesta sin la contraseña
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, role, isActive } = req.body;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar campos
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    if (role) user.role = role;
    if (typeof isActive === 'boolean') user.isActive = isActive;

    await user.save();

    // Enviar respuesta sin la contraseña
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await user.destroy();
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

export default router; 