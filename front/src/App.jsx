import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

// Pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Categories from './pages/Categories'
import Products from './pages/Products'
import Sales from './pages/Sales'
import POS from './pages/POS'

// Components
import Layout from './components/Layout'
import PrivateRoute from './components/PrivateRoute'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />} />
            <Route path="sales" element={<Sales />} />
            <Route path="pos" element={<POS />} />
          </Route>
        </Routes>
      </Router>
      
      <Toaster position="top-right" />
    </QueryClientProvider>
  )
}

export default App 