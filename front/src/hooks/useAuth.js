import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../services/api'

const useAuth = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      
      login: async (email, password) => {
        try {
          const { data } = await api.post('/auth/login', { email, password })
          set({ 
            token: data.token,
            user: data.user,
            isAuthenticated: true 
          })
          api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
          return { success: true }
        } catch (error) {
          return { 
            success: false, 
            error: error.response?.data?.message || 'Error al iniciar sesión'
          }
        }
      },
      
      logout: () => {
        set({ 
          token: null,
          user: null,
          isAuthenticated: false 
        })
        delete api.defaults.headers.common['Authorization']
      },
      
      updateUser: (userData) => {
        set({ user: { ...userData } })
      }
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
)

export { useAuth } 