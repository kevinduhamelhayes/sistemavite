import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import useModal from '../hooks/useModal';

const Navbar = () => {
  const { isOpen, toggleDropdown, ref } = useModal();

  return (
    <>
      {/* Navbar para pantallas pequeñas */}
      <div ref={ref} className="sticky top-0 z-50 flex md:hidden bg-black">
        <nav className="relative flex h-20 w-full items-center justify-between bg-black px-10 lg:px-12">
          <Link to="/" className="m-2 inline-flex cursor-pointer">
            {/* Aquí podría ir un logo o icono */}
          </Link>
          <button type="button" onClick={toggleDropdown}>
            <AiOutlineMenu size={40} color="cyan" />
          </button>
        </nav>
        <nav className={`fixed ${isOpen ? 'translate-x-0' : 'translate-x-[100%]'} right-0 top-[80px] z-[30] flex w-[300px] flex-col rounded-bl-2xl bg-black py-2 text-white brightness-125 transition-transform duration-300`}>
          <Link to="/usuarios">
            <button type="button" className="flex w-full items-center px-4 py-2" onClick={toggleDropdown}>
              <span className="text-xl font-medium">Usuarios</span>
            </button>
          </Link>
          <Link to="/caja-actual">
            <button type="button" className="flex w-full items-center px-4 py-2" onClick={toggleDropdown}>
              <span className="text-xl font-medium">Caja Actual</span>
            </button>
          </Link>
          <Link to="/todas-las-cajas">
            <button type="button" className="flex w-full items-center px-4 py-2" onClick={toggleDropdown}>
              <span className="text-xl font-medium">Todas las Cajas</span>
            </button>
          </Link>
          <Link to="/productos">
            <button type="button" className="flex w-full items-center px-4 py-2" onClick={toggleDropdown}>
              <span className="text-xl font-medium">Productos</span>
            </button>
          </Link>
          <Link to="/ingresar-producto">
            <button type="button" className="flex w-full items-center px-4 py-2" onClick={toggleDropdown}>
              <span className="text-xl font-medium">Ingresar un Producto</span>
            </button>
          </Link>
          <Link to="/edicion-masiva">
            <button type="button" className="flex w-full items-center px-4 py-2" onClick={toggleDropdown}>
              <span className="text-xl font-medium">Edición Masiva</span>
            </button>
          </Link>
        </nav>
      </div>

      {/* Navbar para pantallas medianas y grandes */}
      <nav className="relative top-0 z-50 hidden h-20 w-full items-center justify-between bg-black px-12 text-white md:flex">
        {/* Logo grande para pantallas medianas y grandes */}
        <Link to="/" className="m-2 inline-flex cursor-pointer">
          {/* Aquí podría ir un logo o icono */}
        </Link>
        <ul className="flex w-full grow items-center justify-end gap-10 text-xl">
          <li>
            <Link className="text-lg font-medium sm:text-xl xl:text-2xl" to="/usuarios">
              Usuarios
            </Link>
          </li>
          <li>
            <Link className="text-lg font-medium sm:text-xl xl:text-2xl" to="/caja-actual">
              Caja Actual
            </Link>
          </li>
          <li>
            <Link className="text-lg font-medium sm:text-xl xl:text-2xl" to="/todas-las-cajas">
              Todas las Cajas
            </Link>
          </li>
          <li>
            <Link className="text-lg font-medium sm:text-xl xl:text-2xl" to="/productos">
              Productos
            </Link>
          </li>
          <li>
            <Link className="text-lg font-medium sm:text-xl xl:text-2xl" to="/ingresar-producto">
              Ingresar un Producto
            </Link>
          </li>
          <li>
            <Link className="text-lg font-medium sm:text-xl xl:text-2xl" to="/edicion-masiva">
              Edición Masiva
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
