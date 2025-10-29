import api from './api.js'

export const authService = {
  // Đăng nhập
  login: async (credentials) => {
    const loginData = {
      email: credentials.email,
      password: credentials.password,
    }

    const response = await api.post('/auth/login', loginData)

    // Lưu token và thông tin user vào localStorage nếu có
    if (response.access_token) {
      localStorage.setItem('access_token', response.access_token)
    }
    if (response.user) {
      localStorage.setItem('user', JSON.stringify(response.user))
    }

    return response
  },

  // Đăng ký
  register: async (userData) => {
    // Chuyển đổi dữ liệu để phù hợp với API
    const registerData = {
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      password: userData.password,
    }

    const response = await api.post('/auth/register', registerData)
    return response
  },

  // Đăng xuất
  logout: async () => {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      // Bỏ qua lỗi từ server khi logout
      console.error('Logout error:', error)
    } finally {
      // Luôn xóa dữ liệu local
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh')

      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token)
      }

      return response.data
    } catch (error) {
      // Nếu refresh token thất bại, logout user
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      throw error
    }
  },

  // Lấy thông tin user hiện tại
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me')

      // Cập nhật thông tin user trong localStorage
      localStorage.setItem('user', JSON.stringify(response.data))

      return response.data
    } catch (error) {
      throw error
    }
  },

  // Quên mật khẩu
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Reset mật khẩu
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', {
        token,
        password: newPassword,
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Kiểm tra xem user đã đăng nhập chưa
  isAuthenticated: () => {
    const token = localStorage.getItem('access_token')
    const user = localStorage.getItem('user')
    return !!(token && user)
  },

  // Lấy thông tin user từ localStorage
  getUser: () => {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  // Lấy token từ localStorage
  getToken: () => {
    return localStorage.getItem('access_token')
  },
}
