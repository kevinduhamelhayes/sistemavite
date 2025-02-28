import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Sale = sequelize.define('Sale', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('completed', 'cancelled'),
    defaultValue: 'completed',
  },
  paymentMethod: {
    type: DataTypes.ENUM('cash', 'card'),
    allowNull: false,
  },
  sellerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
});

export default Sale; 