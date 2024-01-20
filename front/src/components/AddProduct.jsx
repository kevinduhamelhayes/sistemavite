import { useState } from 'react';

const AddProduct = () => {
    const [productData, setProductData] = useState({
        barcode: '',
        name: '',
        cost: '',
        finalPrice: '',
        isActive: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductData({
            ...productData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(productData);
        // Aquí puedes añadir la lógica para enviar los datos al servidor o manejarlos como necesites
    };

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Agregar Producto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="barcode" className="text-gray-700">Código de Barra:</label>
                    <input type="text" id="barcode" name="barcode" value={productData.barcode} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded mt-1" />
                </div>
                <div>
                    <label htmlFor="name" className="text-gray-700">Nombre:</label>
                    <input type="text" id="name" name="name" value={productData.name} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded mt-1" />
                </div>
                <div>
                    <label htmlFor="cost" className="text-gray-700">Costo:</label>
                    <input type="number" id="cost" name="cost" value={productData.cost} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded mt-1" />
                </div>
                <div>
                    <label htmlFor="finalPrice" className="text-gray-700">Precio Final:</label>
                    <input type="number" id="finalPrice" name="finalPrice" value={productData.finalPrice} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded mt-1" />
                </div>
                <div className="flex items-center">
                    <input type="checkbox" id="isActive" name="isActive" checked={productData.isActive} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">Activo</label>
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">Agregar Producto</button>
            </form>
        </div>
    );
};

export default AddProduct;
