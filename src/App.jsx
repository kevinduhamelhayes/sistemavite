
import { Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";
import Usuarios from './components/Ususarios.jsx';
import CajaActual from './components/CajaActual.jsx'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/caja-actual" element={<CajaActual/>} />
        {/* Aquí puedes agregar más rutas para otros componentes */}
        <Route path="/" element={<h1 className='text-red-500'>Página Principal</h1>} />
      </Routes>
    </Layout>
  );
}

export default App;
