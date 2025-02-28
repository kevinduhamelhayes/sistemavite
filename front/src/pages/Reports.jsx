import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import api from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Reports() {
  const [dateRange, setDateRange] = useState({
    start: '',
    end: '',
  });

  const { data: reports = {}, isLoading } = useQuery({
    queryKey: ['reports', dateRange],
    queryFn: async () => {
      const response = await api.get('/reports', {
        params: {
          startDate: dateRange.start,
          endDate: dateRange.end,
        },
      });
      return response.data;
    },
  });

  const salesData = {
    labels: reports.dailySales?.map((sale) => sale.date) || [],
    datasets: [
      {
        label: 'Ventas Diarias',
        data: reports.dailySales?.map((sale) => sale.total) || [],
        backgroundColor: '#4F46E5',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Reportes</h1>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="start-date"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha Inicio
          </label>
          <input
            type="date"
            name="start-date"
            id="start-date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={dateRange.start}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, start: e.target.value }))
            }
          />
        </div>
        <div>
          <label
            htmlFor="end-date"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha Fin
          </label>
          <input
            type="date"
            name="end-date"
            id="end-date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={dateRange.end}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, end: e.target.value }))
            }
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Ventas Totales
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            ${reports.totalSales?.toFixed(2) || '0.00'}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Productos Vendidos
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {reports.totalProducts || 0}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Promedio de Venta
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            ${reports.averageSale?.toFixed(2) || '0.00'}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Total Transacciones
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {reports.totalTransactions || 0}
          </dd>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Ventas Diarias
          </h3>
          <div className="mt-5" style={{ height: '400px' }}>
            {isLoading ? (
              <div className="flex h-full items-center justify-center">
                <p>Cargando...</p>
              </div>
            ) : (
              <Bar
                data={salesData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 