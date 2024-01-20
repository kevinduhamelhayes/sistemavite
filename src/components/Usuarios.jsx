

const Usuarios = () => {
  const usuariosFicticios = [
    { id: 1, nombre: 'Juan Pérez', email: 'juanperez@example.com' },
    { id: 2, nombre: 'Ana Gómez', email: 'anagomez@example.com' },
    { id: 3, nombre: 'Pedro Hernández', email: 'pedrohernandez@example.com' },
    { id: 4, nombre: 'María Rodríguez', email: 'mariarodriguez@example.com' },
    { id: 5, nombre: 'Luisa Martínez', email: 'luisamartinez@example.com' },
    { id: 6, nombre: 'Carlos López', email: 'carloslopez@example.com' },
    { id: 7, nombre: 'Sofía González', email: 'sofiagonzalez@example.com' },
    { id: 8, nombre: 'Jorge Ramírez', email: 'jorgeramirez@example.com' }
];


    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold text-center mb-6">Lista de Usuarios</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {usuariosFicticios.map((usuario) => (
                            <tr key={usuario.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {usuario.nombre}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {usuario.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-3">
                                        Editar
                                    </a>
                                    <a href="#" className="text-red-600 hover:text-red-900">
                                        Eliminar
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Usuarios;

