import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Sale from './Sale.js';
import Product from './Product.js';

const SaleItem = sequelize.define('SaleItem', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});

SaleItem.belongsTo(Sale, {
  foreignKey: {
    name: 'saleId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

SaleItem.belongsTo(Product, {
  foreignKey: {
    name: 'productId',
    allowNull: false,
  },
});

Sale.hasMany(SaleItem, {
  foreignKey: 'saleId',
});

Product.hasMany(SaleItem, {
  foreignKey: 'productId',
});

export default SaleItem; 