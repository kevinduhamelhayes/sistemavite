import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { CreditCardIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import ProductSearch from '../components/ProductSearch';
import Cart from '../components/Cart';
import api from '../services/api';

export default function POS() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [barcode, setBarcode] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const barcodeInputRef = useRef(null);

  useEffect(() => {
    fetchProducts();
    // Enfoca el input de código de barras al cargar
    barcodeInputRef.current?.focus();
  }, []);

  // Mantén el foco en el input de código de barras
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName !== 'INPUT') {
        barcodeInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al cargar los productos');
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleBarcodeSubmit = async (e) => {
    e.preventDefault();
    if (!barcode.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/products/barcode/${barcode}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Producto no encontrado');
      }

      const product = await response.json();
      addToCart(product);
      setBarcode('');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addToCart = (product) => {
    if (product.stock < 1) {
      toast.error('Producto sin stock');
      return;
    }

    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        toast.error('Stock insuficiente');
        return;
      }
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    const product = products.find(p => p.id === productId);
    if (!product || quantity < 1 || quantity > product.stock) {
      toast.error('Cantidad no válida');
      return;
    }
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const createSale = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          })),
          total,
          paymentMethod
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al procesar la venta');
      }

      setCart([]);
      toast.success('Venta realizada con éxito');
      // Actualiza los productos después de la venta
      fetchProducts();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Agregue productos al carrito');
      return;
    }
    createSale();
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode?.includes(searchTerm)
  );

  return (
    <div className="flex h-full">
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-semibold text-gray-900">Punto de Venta</h1>
        
        <div className="mt-4 space-y-4">
          <form onSubmit={handleBarcodeSubmit} className="flex gap-2">
            <input
              ref={barcodeInputRef}
              type="text"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              placeholder="Escanear código de barras"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Buscar
            </button>
          </form>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Stock: {product.stock}
                </p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  ${product.price}
                </p>
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  disabled={product.stock < 1}
                  className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300"
                >
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-96 bg-gray-50 p-4 border-l">
        <h2 className="text-lg font-medium text-gray-900">Carrito</h2>
        <div className="mt-4 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {item.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  ${item.price} x {item.quantity}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  -
                </button>
                <span className="text-gray-900">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">Método de pago</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`px-3 py-1 rounded ${
                  paymentMethod === 'cash'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Efectivo
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`px-3 py-1 rounded ${
                  paymentMethod === 'card'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Tarjeta
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-gray-900">Total</span>
            <span className="text-xl font-semibold text-gray-900">
              ${total.toFixed(2)}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCheckout}
            className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Finalizar venta
          </button>
        </div>
      </div>
    </div>
  );
} 