import api from './api.js'

export const homestayService = {
  // Tìm kiếm homestay
  searchHomestays: async (searchParams) => {
    const response = await api.get('/homestays/search', { params: searchParams })
    return response.data
  },

  // Lấy danh sách homestay
  getHomestays: async (page = 1, limit = 12, filters = {}) => {
    const response = await api.get('/homestays', {
      params: { page, limit, ...filters },
    })
    return response.data
  },

  // Lấy chi tiết homestay
  getHomestayById: async (id) => {
    const response = await api.get(`/homestays/${id}`)
    return response.data
  },

  // Lấy homestay theo địa điểm
  getHomestaysByLocation: async (location, page = 1, limit = 12) => {
    const response = await api.get('/homestays/by-location', {
      params: { location, page, limit },
    })
    return response.data
  },

  // Lấy homestay phổ biến
  getPopularHomestays: async (limit = 8) => {
    const response = await api.get('/homestays/popular', {
      params: { limit },
    })
    return response.data
  },

  // Lấy homestay theo danh mục
  getHomestaysByCategory: async (category, page = 1, limit = 12) => {
    const response = await api.get('/homestays/by-category', {
      params: { category, page, limit },
    })
    return response.data
  },

  // Lấy các tiện nghi có sẵn
  getAmenities: async () => {
    const response = await api.get('/homestays/amenities')
    return response.data
  },

  // Lấy đánh giá của homestay
  getHomestayReviews: async (homestayId, page = 1, limit = 10) => {
    const response = await api.get(`/homestays/${homestayId}/reviews`, {
      params: { page, limit },
    })
    return response.data
  },

  // Thêm đánh giá
  addReview: async (homestayId, reviewData) => {
    const response = await api.post(`/homestays/${homestayId}/reviews`, reviewData)
    return response.data
  },

  // Kiểm tra tình trạng phòng
  checkAvailability: async (homestayId, checkIn, checkOut) => {
    const response = await api.get(`/homestays/${homestayId}/availability`, {
      params: { checkIn, checkOut },
    })
    return response.data
  },

  // Lấy giá phòng theo ngày
  getPricing: async (homestayId, checkIn, checkOut, guests) => {
    const response = await api.get(`/homestays/${homestayId}/pricing`, {
      params: { checkIn, checkOut, guests },
    })
    return response.data
  },
}

export const bookingService = {
  // Tạo booking mới
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings', bookingData)
    return response.data
  },

  // Lấy danh sách booking của user
  getUserBookings: async (page = 1, limit = 10, status = null) => {
    const params = { page, limit }
    if (status) params.status = status

    const response = await api.get('/bookings/my-bookings', { params })
    return response.data
  },

  // Lấy chi tiết booking
  getBookingById: async (id) => {
    const response = await api.get(`/bookings/${id}`)
    return response.data
  },

  // Hủy booking
  cancelBooking: async (id, reason) => {
    const response = await api.patch(`/bookings/${id}/cancel`, { reason })
    return response.data
  },

  // Xác nhận thanh toán
  confirmPayment: async (bookingId, paymentData) => {
    const response = await api.post(`/bookings/${bookingId}/payment`, paymentData)
    return response.data
  },

  // Lấy lịch sử thanh toán
  getPaymentHistory: async (bookingId) => {
    const response = await api.get(`/bookings/${bookingId}/payments`)
    return response.data
  },
}

export const userService = {
  // Cập nhật thông tin profile
  updateProfile: async (userData) => {
    const response = await api.patch('/users/profile', userData)
    return response.data
  },

  // Thay đổi mật khẩu
  changePassword: async (currentPassword, newPassword) => {
    const response = await api.patch('/users/change-password', {
      currentPassword,
      newPassword,
    })
    return response.data
  },

  // Upload avatar
  uploadAvatar: async (file) => {
    const formData = new FormData()
    formData.append('avatar', file)

    const response = await api.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Lấy danh sách yêu thích
  getFavorites: async (page = 1, limit = 12) => {
    const response = await api.get('/users/favorites', {
      params: { page, limit },
    })
    return response.data
  },

  // Thêm vào yêu thích
  addToFavorites: async (homestayId) => {
    const response = await api.post('/users/favorites', { homestayId })
    return response.data
  },

  // Xóa khỏi yêu thích
  removeFromFavorites: async (homestayId) => {
    const response = await api.delete(`/users/favorites/${homestayId}`)
    return response.data
  },
}
