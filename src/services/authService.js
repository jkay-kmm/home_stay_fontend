import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api/auth'

// Create axios instance with base configuration
const authAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to include auth token
authAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const authService = {
  // Đăng nhập
  login: async (credentials) => {
    try {
      const response = await authAPI.post('/login', {
        email: credentials.email,
        password: credentials.password,
      })

      const { token, user } = response.data

      // Store token and user data
      localStorage.setItem('auth_token', token)
      localStorage.setItem('user_data', JSON.stringify(user))

      return {
        success: true,
        data: { token, user },
        message: 'Login successful',
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
        errors: error.response?.data?.errors || [],
      }
    }
  },

  // Đăng ký
  register: async (userData) => {
    try {
      const response = await authAPI.post('/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      })

      const { token, user } = response.data

      // Store token and user data
      localStorage.setItem('auth_token', token)
      localStorage.setItem('user_data', JSON.stringify(user))

      return {
        success: true,
        data: { token, user },
        message: 'Registration successful',
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
        errors: error.response?.data?.errors || [],
      }
    }
  },

  // Logout user
  logout: async () => {
    try {
      await authAPI.post('/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Always clear local storage
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
    }
  },

  // Get current user
  getCurrentUser: () => {
    const userData = localStorage.getItem('user_data')
    return userData ? JSON.parse(userData) : null
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('auth_token')
    const user = authService.getCurrentUser()
    return !!(token && user)
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem('auth_token')
  },
}

export default authService
