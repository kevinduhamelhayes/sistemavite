
import { Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout.jsx";
import Usuarios from './components/Usuarios.jsx';
import CajaActual from './components/CajaActual.jsx'
import TodasLasCajas from './components/TodasLasCajas.jsx'
import Productos from './components/Productos.jsx'
import AddProduct from './components/AddProduct.jsx'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/caja-actual" element={<CajaActual/>} />
        <Route path="/todas-las-cajas" element={<TodasLasCajas/>} />
        <Route path="/productos" element={< Productos/>} />
        <Route path="/ingresar-producto" element={< AddProduct/>} />
        {/* Aquí puedes agregar más rutas para otros componentes */}
        <Route path="/" element={<h1 className='text-red-500'>Página Principal</h1>} />
      </Routes>
    </Layout>
  );
}

export default App;
