
import { Link } from 'react-router-dom'; // Asegúrate de haber instalado react-router-dom

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Mi Aplicación</h1>
        <div>
          <Link to="/" className="px-3 py-2 rounded hover:bg-gray-700">Inicio</Link>
          <Link to="/about" className="px-3 py-2 rounded hover:bg-gray-700">Acerca de</Link>
          <Link to="/contact" className="px-3 py-2 rounded hover:bg-gray-700">Contacto</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
