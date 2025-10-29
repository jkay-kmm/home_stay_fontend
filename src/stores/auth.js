import { defineStore } from 'pinia'
import { authService } from '@/services/authService.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!(state.user && state.token),
    isGuest: (state) => state.user?.userType === 'guest',
    isHost: (state) => state.user?.userType === 'host',
    userName: (state) => (state.user ? `${state.user.firstName} ${state.user.lastName}` : ''),
  },

  actions: {
    // Khởi tạo store từ localStorage
    initializeAuth() {
      const token = authService.getToken()
      const user = authService.getUser()

      if (token && user) {
        this.token = token
        this.user = user
      }
    },

    // Đăng nhập
    async login(credentials) {
      this.isLoading = true
      this.error = null

      try {
        const response = await authService.login(credentials)

        // Lưu thông tin dựa trên response từ API
        if (response.access_token) {
          this.token = response.access_token
        }
        if (response.user) {
          this.user = response.user
        }

        return response
      } catch (error) {
        // Xử lý lỗi cụ thể cho đăng nhập
        if (error.response?.status === 401) {
          this.error = 'Email hoặc mật khẩu không chính xác'
        } else if (error.response?.status === 404) {
          this.error = 'Tài khoản không tồn tại'
        } else {
          this.error = error.message || 'Đăng nhập thất bại. Vui lòng thử lại.'
        }
        throw new Error(this.error)
      } finally {
        this.isLoading = false
      }
    },

    // Đăng ký
    async register(userData) {
      this.isLoading = true
      this.error = null

      try {
        const response = await authService.register(userData)
        return response
      } catch (error) {
        // Xử lý lỗi cụ thể cho đăng ký
        if (error.response?.status === 409) {
          this.error = 'Email đã được sử dụng. Vui lòng chọn email khác.'
        } else if (error.response?.status === 400) {
          this.error = 'Thông tin đăng ký không hợp lệ. Vui lòng kiểm tra lại.'
        } else {
          this.error = error.message || 'Đăng ký thất bại. Vui lòng thử lại.'
        }
        throw new Error(this.error)
      } finally {
        this.isLoading = false
      }
    },

    // Đăng xuất
    async logout() {
      this.isLoading = true

      try {
        await authService.logout()
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.token = null
        this.user = null
        this.error = null
        this.isLoading = false
      }
    },

    // Lấy thông tin user hiện tại
    async fetchCurrentUser() {
      if (!this.token) return

      try {
        const user = await authService.getCurrentUser()
        this.user = user
        return user
      } catch (error) {
        // Nếu token không hợp lệ, logout
        this.logout()
        throw error
      }
    },

    // Refresh token
    async refreshToken() {
      try {
        const response = await authService.refreshToken()
        this.token = response.access_token
        return response
      } catch (error) {
        this.logout()
        throw error
      }
    },

    // Cập nhật thông tin user
    updateUser(userData) {
      if (this.user) {
        this.user = { ...this.user, ...userData }
        localStorage.setItem('user', JSON.stringify(this.user))
      }
    },

    // Clear error
    clearError() {
      this.error = null
    },
  },
})
