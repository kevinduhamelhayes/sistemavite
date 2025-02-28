import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import api from '../services/api';

export default function ProductSearch({ onSelect }) {
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', search],
    queryFn: async () => {
      const response = await api.get('/products', {
        params: { search },
      });
      return response.data;
    },
    enabled: search.length > 2,
  });

  const handleSelect = (product) => {
    setSelectedProduct(product);
    setSearch('');
    onSelect(product);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar productos..."
          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
      </div>

      {search.length > 2 && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {isLoading ? (
            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
              Cargando...
            </div>
          ) : products.length === 0 ? (
            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
              No se encontraron productos
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="relative cursor-pointer select-none py-2 px-4 hover:bg-indigo-600 hover:text-white"
                onClick={() => handleSelect(product)}
              >
                <div className="flex justify-between">
                  <span className="truncate">{product.name}</span>
                  <span className="ml-2">${product.price}</span>
                </div>
                <p className="mt-1 truncate text-sm text-gray-500">
                  Stock: {product.stock}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
} 