import { useState } from 'react';

const productosFicticios = [
  { id: 1, nombre: 'Producto 1', precio: 100, fechaEdicion: '2024-01-01' },
  { id: 2, nombre: 'Producto 2', precio: 150, fechaEdicion: '2024-01-02' },
  { id: 3, nombre: 'Producto 3', precio: 85, fechaEdicion: '2024-01-02' },
  { id: 4, nombre: 'Producto 4', precio: 250, fechaEdicion: '2024-01-02' },
  { id: 5, nombre: 'Producto 5', precio: 50, fechaEdicion: '2024-01-02' },
];

const Productos = () => {
    const [productos, setProductos] = useState(productosFicticios);

    // Funciones de ordenamiento
    const ordenarPorPrecio = () => {
        const productosOrdenados = [...productos].sort((a, b) => a.precio - b.precio);
        setProductos(productosOrdenados);
    };

    const ordenarPorNombre = () => {
        const productosOrdenados = [...productos].sort((a, b) => 
            a.nombre.localeCompare(b.nombre)
        );
        setProductos(productosOrdenados);
    };

    const ordenarPorFechaEdicion = () => {
        const productosOrdenados = [...productos].sort((a, b) => 
            new Date(b.fechaEdicion) - new Date(a.fechaEdicion)
        );
        setProductos(productosOrdenados);
    };

    return (
        <div className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Lista de Productos</h1>
            <div className="flex justify-center gap-4 mb-6">
                <button onClick={ordenarPorNombre} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Ordenar por Nombre</button>
                <button onClick={ordenarPorPrecio} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Ordenar por Precio</button>
                <button onClick={ordenarPorFechaEdicion} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Ordenar por Fecha de Edición</button>
            </div>
            <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="py-3 px-6">Producto</th>
                            <th scope="col" className="py-3 px-6">Precio</th>
                            <th scope="col" className="py-3 px-6">Fecha de Edición</th>
                            <th scope="col" className="py-3 px-6">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(producto => (
                            <tr key={producto.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="py-4 px-6">{producto.nombre}</td>
                                <td className="py-4 px-6">${producto.precio}</td>
                                <td className="py-4 px-6">{producto.fechaEdicion}</td>
                                <td className="py-4 px-6">
                                    <button className="text-blue-600 hover:text-blue-900">Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Productos;
