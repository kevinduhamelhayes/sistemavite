


const cajasFicticias = [
  { numero: 1, fecha: '2024-01-02', inicio: '08:00', cierre: '17:00', cantidadVentas: 10, totalVenta: 1500, gananciaEstimada: 300 },
  { numero: 2, fecha: '2024-01-02', inicio: '09:00', cierre: '18:00', cantidadVentas: 12, totalVenta: 1800, gananciaEstimada: 350 },
  { numero: 3, fecha: '2024-01-02', inicio: '10:00', cierre: '19:00', cantidadVentas: 15, totalVenta: 2000, gananciaEstimada: 400 },
  { numero: 4, fecha: '2024-01-02', inicio: '11:00', cierre: '20:00', cantidadVentas: 8, totalVenta: 1200, gananciaEstimada: 240 },
  { numero: 5, fecha: '2024-01-02', inicio: '12:00', cierre: '21:00', cantidadVentas: 18, totalVenta: 2200, gananciaEstimada: 440 },
  { numero: 6, fecha: '2024-01-02', inicio: '13:00', cierre: '22:00', cantidadVentas: 20, totalVenta: 2500, gananciaEstimada: 500 },
];
const TodasLasCajas = () => {
  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Registro de Cajas</h1>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">Número de Caja</th>
              <th scope="col" className="py-3 px-6">Fecha</th>
              <th scope="col" className="py-3 px-6">Inicio</th>
              <th scope="col" className="py-3 px-6">Cierre</th>
              <th scope="col" className="py-3 px-6">Cantidad de Ventas</th>
              <th scope="col" className="py-3 px-6">Total de Venta</th>
              <th scope="col" className="py-3 px-6">Ganancia Estimada</th>
            </tr>
          </thead>
          <tbody>
            {cajasFicticias.map(caja => (
              <tr key={caja.numero} className="bg-white border-b hover:bg-gray-50">
                <td className="py-4 px-6">{caja.numero}</td>
                <td className="py-4 px-6">{caja.fecha}</td>
                <td className="py-4 px-6">{caja.inicio}</td>
                <td className="py-4 px-6">{caja.cierre}</td>
                <td className="py-4 px-6">{caja.cantidadVentas}</td>
                <td className="py-4 px-6">${caja.totalVenta}</td>
                <td className="py-4 px-6">${caja.gananciaEstimada}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodasLasCajas;