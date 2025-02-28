import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const SaleItem = sequelize.define('SaleItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  saleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Sales',
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

export default SaleItem; 