import { useState } from 'react';

const productosFicticios = [
    { id: 1, nombre: 'Producto 1', precio: 100, cantidad: 2 },
    { id: 2, nombre: 'Producto 2', precio: 150, cantidad: 3 },
    { id: 3, nombre: 'Producto 3', precio: 200, cantidad: 1 },
    { id: 4, nombre: 'Producto 4', precio: 250, cantidad: 2 },
    { id: 5, nombre: 'Producto 5', precio: 300, cantidad: 1 },
    { id: 6, nombre: 'Producto 6', precio: 350, cantidad: 2 },
    // Más productos ficticios
];

const CajaActual = () => {
    const [tipoVenta, setTipoVenta] = useState('Efectivo');
    const totalFinal = productosFicticios.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

    return (
        <div className="container mx-auto p-8 bg-white shadow-md rounded-lg">
            <h1 className="text-4xl font-bold text-center mb-8">Caja Actual</h1>
            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    autoFocus
                    className="w-1/3 p-3 mr-4 border border-gray-400 rounded-lg"
                    placeholder="Ingresa el código del producto"
                />
                <button className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300">
                    Aceptar
                </button>
            </div>
            <div className="flex">
                <div className="flex-1 w-2/3">
                    {productosFicticios.map(producto => (
                        <div key={producto.id} className="mb-4 flex justify-between p-4 border border-gray-300 rounded-lg shadow">
                            <span className="font-semibold">Producto: {producto.nombre}</span>
                            <span>Precio: ${producto.precio}</span>
                            <span>Cantidad: {producto.cantidad}</span>
                            <span className="font-semibold">Total: ${producto.precio * producto.cantidad}</span>
                        </div>
                    ))}
                </div>
                <div className="w-1/3">
                    <div className="sticky top-20 p-4 bg-gray-100 rounded-lg shadow-lg">
                        <p className="text-xl font-semibold mb-4">Total Final: <span className="text-2xl">${totalFinal}</span></p>
                        <select value={tipoVenta} onChange={(e) => setTipoVenta(e.target.value)} className="mb-4 p-3 w-full border border-gray-400 rounded-lg">
                            <option value="Efectivo">Efectivo</option>
                            <option value="Tarjeta">Tarjeta</option>
                            {/* Otras opciones de pago */}
                        </select>
                        <button className="p-3 w-full bg-green-500 hover:bg-green-700 text-white rounded-lg transition duration-300">
                            Cerrar Venta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CajaActual;



