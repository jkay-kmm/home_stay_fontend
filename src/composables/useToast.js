import { ref } from 'vue'

const toasts = ref([])
let toastId = 0

export function useToast() {
  const showToast = (options) => {
    const id = ++toastId
    const toast = {
      id,
      visible: true,
      type: 'success',
      title: '',
      message: '',
      duration: 5000,
      autoClose: true,
      ...options,
    }

    toasts.value.push(toast)

    // Auto remove after duration
    if (toast.autoClose) {
      setTimeout(() => {
        hideToast(id)
      }, toast.duration)
    }

    return id
  }

  const hideToast = (id) => {
    const index = toasts.value.findIndex((toast) => toast.id === id)
    if (index > -1) {
      toasts.value[index].visible = false
      // Remove from array after animation
      setTimeout(() => {
        const currentIndex = toasts.value.findIndex((toast) => toast.id === id)
        if (currentIndex > -1) {
          toasts.value.splice(currentIndex, 1)
        }
      }, 300)
    }
  }

  const hideAllToasts = () => {
    toasts.value.forEach((toast) => {
      toast.visible = false
    })
    setTimeout(() => {
      toasts.value.splice(0)
    }, 300)
  }

  // Predefined toast types
  const showSuccess = (message, title = 'Thành công!') => {
    return showToast({
      type: 'success',
      title,
      message,
    })
  }

  const showError = (message, title = 'Lỗi!') => {
    return showToast({
      type: 'error',
      title,
      message,
      duration: 4000, // Error messages stay longer
    })
  }

  const showWarning = (message, title = 'Cảnh báo!') => {
    return showToast({
      type: 'warning',
      title,
      message,
      duration: 3000,
    })
  }

  // Specific messages for auth
  const showLoginSuccess = (userName = '') => {
    const message = userName
      ? `Chào mừng ${userName}! Bạn đã đăng nhập thành công.`
      : 'Bạn đã đăng nhập thành công!'

    return showSuccess(message, '🎉 Đăng nhập thành công!')
  }

  const showRegisterSuccess = () => {
    return showSuccess(
      'Tài khoản của bạn đã được tạo thành công. Bây giờ bạn có thể đăng nhập.',
      '🎉 Đăng ký thành công!',
    )
  }

  const showLogoutSuccess = () => {
    return showSuccess('Bạn đã đăng xuất thành công. Hẹn gặp lại!', '👋 Đăng xuất thành công!')
  }

  return {
    toasts,
    showToast,
    hideToast,
    hideAllToasts,
    showSuccess,
    showError,
    showWarning,
    showLoginSuccess,
    showRegisterSuccess,
    showLogoutSuccess,
  }
}
