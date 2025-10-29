import { ref } from 'vue'

export function useApiError() {
  const error = ref('')
  const isLoading = ref(false)

  const handleApiCall = async (apiFunction) => {
    isLoading.value = true
    error.value = ''

    try {
      const result = await apiFunction()
      return result
    } catch (err) {
      // Xử lý các loại lỗi khác nhau
      if (err.response) {
        // Lỗi từ server (4xx, 5xx)
        const status = err.response.status
        const data = err.response.data

        switch (status) {
          case 400:
            error.value = data.message || 'Dữ liệu không hợp lệ'
            break
          case 401:
            error.value = 'Thông tin đăng nhập không chính xác'
            break
          case 403:
            error.value = 'Bạn không có quyền thực hiện hành động này'
            break
          case 404:
            error.value = 'Không tìm thấy tài nguyên'
            break
          case 409:
            error.value = data.message || 'Email đã được sử dụng'
            break
          case 422:
            error.value = data.message || 'Dữ liệu không hợp lệ'
            break
          case 500:
            error.value = 'Lỗi server. Vui lòng thử lại sau'
            break
          default:
            error.value = data.message || 'Có lỗi xảy ra'
        }
      } else if (err.request) {
        // Lỗi network
        error.value = 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng'
      } else {
        // Lỗi khác
        error.value = err.message || 'Có lỗi xảy ra'
      }

      throw new Error(error.value)
    } finally {
      isLoading.value = false
    }
  }

  const clearError = () => {
    error.value = ''
  }

  return {
    error,
    isLoading,
    handleApiCall,
    clearError,
  }
}
