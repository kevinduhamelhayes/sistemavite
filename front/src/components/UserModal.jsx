import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Modal from './Modal';
import api from '../services/api';

export default function UserModal({ open, onClose, user = null }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'seller',
    isActive: true,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        password: '',
        role: user.role,
        isActive: user.isActive,
      });
    } else {
      setFormData({
        username: '',
        email: '',
        password: '',
        role: 'seller',
        isActive: true,
      });
    }
  }, [user]);

  const createUser = useMutation({
    mutationFn: async (data) => {
      const response = await api.post('/users', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      onClose();
    },
  });

  const updateUser = useMutation({
    mutationFn: async (data) => {
      const response = await api.put(`/users/${user.id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      onClose();
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { ...formData };
    if (!data.password) {
      delete data.password;
    }

    if (user) {
      updateUser.mutate(data);
    } else {
      createUser.mutate(data);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={user ? 'Editar Usuario' : 'Nuevo Usuario'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre de Usuario
          </label>
          <input
            type="text"
            name="username"
            id="username"
            required
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required={!user}
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {user && (
            <p className="mt-1 text-sm text-gray-500">
              Dejar en blanco para mantener la contraseña actual
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Rol
          </label>
          <select
            name="role"
            id="role"
            required
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="admin">Administrador</option>
            <option value="seller">Vendedor</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            id="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label
            htmlFor="isActive"
            className="ml-2 block text-sm text-gray-900"
          >
            Usuario activo
          </label>
        </div>

        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
          >
            {user ? 'Guardar cambios' : 'Crear usuario'}
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
} 