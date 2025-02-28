import User from './User.js';
import Category from './Category.js';
import Product from './Product.js';
import Sale from './Sale.js';
import SaleItem from './SaleItem.js';

// Relaciones de Categorías y Productos
Category.hasMany(Product, {
  foreignKey: 'categoryId',
  as: 'products',
});

Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
});

// Relaciones de Ventas
User.hasMany(Sale, {
  foreignKey: 'sellerId',
  as: 'sales',
});

Sale.belongsTo(User, {
  foreignKey: 'sellerId',
  as: 'seller',
});

Sale.hasMany(SaleItem, {
  foreignKey: 'saleId',
  as: 'items',
});

SaleItem.belongsTo(Sale, {
  foreignKey: 'saleId',
  as: 'sale',
});

Product.hasMany(SaleItem, {
  foreignKey: 'productId',
  as: 'saleItems',
});

SaleItem.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product',
});

export {
  User,
  Category,
  Product,
  Sale,
  SaleItem,
}; 