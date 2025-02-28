import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

// Interceptor para manejar errores
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('auth-storage')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api 