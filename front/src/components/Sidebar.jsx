import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Categorías', href: '/categories' },
  { name: 'Productos', href: '/products' },
  { name: 'Ventas', href: '/sales' },
  { name: 'POS', href: '/pos' },
];

function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="h-full px-3 py-4">
        <div className="space-y-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar; 