import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    dailySales: { total: 0, count: 0 },
    monthlySales: { total: 0, count: 0 },
    totalProducts: 0,
    lowStockProducts: 0,
    monthlyHistory: [],
  });
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const handleAuthError = () => {
    localStorage.removeItem('token');
    toast.error('Sesión expirada. Por favor, inicie sesión nuevamente.');
    navigate('/login');
  };

  const fetchStats = async () => {
    try {
      console.log('Token encontrado:', token);
      console.log('URL de la API:', apiUrl);
      
      const response = await fetch(`${apiUrl}/api/sales/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Código de respuesta:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Respuesta del servidor:', errorText);
        throw new Error(`Error ${response.status}: El servidor no está respondiendo correctamente`);
      }

      const data = await response.json();
      console.log('Datos recibidos:', data);
      setStats(data);
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      toast.error('Error al cargar las estadísticas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [token]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Ventas Diarias"
          value={`$${stats.dailySales.total.toFixed(2)}`}
          icon={<CurrencyDollarIcon className="h-6 w-6" />}
          color="bg-green-100"
          textColor="text-green-800"
        />
        <StatCard
          title="Ventas Mensuales"
          value={`$${stats.monthlySales.total.toFixed(2)}`}
          icon={<ChartBarIcon className="h-6 w-6" />}
          color="bg-blue-100"
          textColor="text-blue-800"
        />
        <StatCard
          title="Total Productos"
          value={stats.totalProducts}
          icon={<ShoppingCartIcon className="h-6 w-6" />}
          color="bg-purple-100"
          textColor="text-purple-800"
        />
        <StatCard
          title="Productos Bajo Stock"
          value={stats.lowStockProducts}
          icon={<ExclamationTriangleIcon className="h-6 w-6" />}
          color="bg-red-100"
          textColor="text-red-800"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Historial de Ventas Mensuales</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Período
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Ventas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cantidad de Ventas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Promedio por Venta
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.monthlyHistory.map((month) => (
                <tr key={`${month.year}-${month.month}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {monthNames[month.month - 1]} {month.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatCurrency(month.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {month.count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatCurrency(month.count > 0 ? month.total / month.count : 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, textColor }) => (
  <div className={`${color} rounded-lg shadow p-6`}>
    <div className="flex items-center">
      <div className={`${textColor} mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className={`text-2xl font-semibold ${textColor}`}>{value}</p>
      </div>
    </div>
  </div>
);

export default Dashboard; 