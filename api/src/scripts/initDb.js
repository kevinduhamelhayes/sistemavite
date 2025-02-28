import bcrypt from 'bcryptjs';
import sequelize from '../config/database.js';
import { User, Category } from '../models/index.js';

const initializeDatabase = async () => {
  try {
    // Sincronizar la base de datos
    await sequelize.sync({ force: true });
    console.log('Base de datos sincronizada correctamente');

    // Crear usuario administrador
    const adminPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
      isActive: true,
    });

    // Crear categorías iniciales
    const categories = [
      { name: 'Bebidas', description: 'Refrescos, jugos, agua, etc.' },
      { name: 'Snacks', description: 'Papas, galletas, chocolates, etc.' },
      { name: 'Lácteos', description: 'Leche, yogurt, queso, etc.' },
      { name: 'Abarrotes', description: 'Arroz, frijoles, aceite, etc.' },
      { name: 'Limpieza', description: 'Jabón, detergente, etc.' },
    ];

    await Category.bulkCreate(categories);

    console.log('Base de datos inicializada correctamente');
    console.log('Usuario administrador creado:');
    console.log('Email: admin@example.com');
    console.log('Contraseña: admin123');

    process.exit(0);
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    process.exit(1);
  }
};

initializeDatabase(); 