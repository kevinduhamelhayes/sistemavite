import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Sale = sequelize.define('Sale', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  paymentMethod: {
    type: DataTypes.ENUM('cash', 'card', 'transfer'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('completed', 'cancelled'),
    defaultValue: 'completed',
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

Sale.belongsTo(User, {
  foreignKey: {
    name: 'sellerId',
    allowNull: false,
  },
});

User.hasMany(Sale, {
  foreignKey: 'sellerId',
});

export default Sale; 