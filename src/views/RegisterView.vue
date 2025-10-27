<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-image">
        <div class="image-content">
          <h3>Tham gia cộng đồng homestay</h3>
          <p>Khởi đầu hành trình khám phá những trải nghiệm lưu trú độc đáo</p>
        </div>
      </div>

      <div class="register-form-wrapper">
        <div class="form-header">
          <h2>Đăng ký</h2>
          <p>Tạo tài khoản để bắt đầu!</p>
        </div>

        <form @submit.prevent="handleRegister" class="register-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">Họ</label>
              <input
                type="text"
                id="firstName"
                v-model="registerForm.firstName"
                placeholder="Nhập họ"
                required
              />
            </div>

            <div class="form-group">
              <label for="lastName">Tên</label>
              <input
                type="text"
                id="lastName"
                v-model="registerForm.lastName"
                placeholder="Nhập tên"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="registerForm.email"
              placeholder="Nhập email của bạn"
              required
            />
          </div>

          <div class="form-group">
            <label for="phone">Số điện thoại</label>
            <input
              type="tel"
              id="phone"
              v-model="registerForm.phone"
              placeholder="Nhập số điện thoại"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              v-model="registerForm.password"
              placeholder="Nhập mật khẩu"
              required
            />
            <div class="password-strength">
              <div class="strength-bar" :class="passwordStrengthClass"></div>
              <span class="strength-text">{{ passwordStrengthText }}</span>
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Xác nhận mật khẩu</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="registerForm.confirmPassword"
              placeholder="Nhập lại mật khẩu"
              required
            />
            <div v-if="registerForm.confirmPassword && !passwordsMatch" class="error-message">
              Mật khẩu không khớp
            </div>
          </div>

          <div class="form-group">
            <label for="userType">Loại tài khoản</label>
            <select id="userType" v-model="registerForm.userType" required>
              <option value="">Chọn loại tài khoản</option>
              <option value="guest">Khách hàng</option>
              <option value="host">Chủ nhà</option>
            </select>
          </div>

          <div class="form-options">
            <label class="checkbox-container">
              <input type="checkbox" v-model="registerForm.agreeTerms" required />
              <span class="checkmark"></span>
              Tôi đồng ý với <a href="#" class="terms-link">Điều khoản sử dụng</a> và
              <a href="#" class="terms-link">Chính sách bảo mật</a>
            </label>
          </div>

          <div class="form-options">
            <label class="checkbox-container">
              <input type="checkbox" v-model="registerForm.receiveUpdates" />
              <span class="checkmark"></span>
              Nhận thông báo về ưu đãi và cập nhật mới
            </label>
          </div>

          <button type="submit" class="register-btn" :disabled="isLoading || !isFormValid">
            <span v-if="isLoading">Đang đăng ký...</span>
            <span v-else>Đăng ký</span>
          </button>

          <div class="divider">
            <span>hoặc</span>
          </div>

          <button type="button" class="google-btn">
            <svg class="google-icon" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Đăng ký bằng Google
          </button>
        </form>

        <div class="form-footer">
          <p>
            Đã có tài khoản?
            <router-link to="/login" class="login-link">Đăng nhập ngay</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)

const registerForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  userType: '',
  agreeTerms: false,
  receiveUpdates: false,
})

const passwordStrength = computed(() => {
  const password = registerForm.password
  if (!password) return 0

  let strength = 0
  if (password.length >= 8) strength++
  if (/[a-z]/.test(password)) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++

  return strength
})

const passwordStrengthClass = computed(() => {
  const strength = passwordStrength.value
  if (strength <= 1) return 'weak'
  if (strength <= 3) return 'medium'
  return 'strong'
})

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value
  if (!registerForm.password) return ''
  if (strength <= 1) return 'Yếu'
  if (strength <= 3) return 'Trung bình'
  return 'Mạnh'
})

const passwordsMatch = computed(() => {
  return registerForm.password === registerForm.confirmPassword
})

const isFormValid = computed(() => {
  return (
    registerForm.firstName &&
    registerForm.lastName &&
    registerForm.email &&
    registerForm.phone &&
    registerForm.password &&
    registerForm.confirmPassword &&
    registerForm.userType &&
    registerForm.agreeTerms &&
    passwordsMatch.value &&
    passwordStrength.value >= 2
  )
})

const handleRegister = async () => {
  if (!isFormValid.value) return

  isLoading.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // TODO: Implement actual registration logic
    console.log('Registration data:', registerForm)

    // Redirect to login page after successful registration
    router.push('/login')
  } catch (error) {
    console.error('Registration failed:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.register-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1200px;
  width: 100%;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.register-form-wrapper {
  padding: 40px 50px;
  overflow-y: auto;
  max-height: 90vh;
}

.form-header {
  text-align: center;
  margin-bottom: 30px;
}

.form-header h2 {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.form-header p {
  color: #666;
  font-size: 16px;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.form-group input,
.form-group select {
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
}

.password-strength {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 5px;
}

.strength-bar {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  transition: background-color 0.3s ease;
}

.strength-bar.weak {
  background-color: #ff4757;
}

.strength-bar.medium {
  background-color: #ffa502;
}

.strength-bar.strong {
  background-color: #2ed573;
}

.strength-text {
  font-size: 12px;
  font-weight: 600;
}

.error-message {
  color: #ff4757;
  font-size: 12px;
  margin-top: 4px;
}

.form-options {
  margin: 5px 0;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.checkbox-container input[type='checkbox'] {
  width: 16px;
  height: 16px;
  margin-top: 2px;
  flex-shrink: 0;
}

.terms-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.terms-link:hover {
  text-decoration: underline;
}

.register-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  margin-top: 10px;
}

.register-btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.register-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.divider {
  text-align: center;
  position: relative;
  margin: 20px 0;
  color: #666;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e1e5e9;
  z-index: 1;
}

.divider span {
  background: white;
  padding: 0 16px;
  position: relative;
  z-index: 2;
}

.google-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 24px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  transition: border-color 0.3s ease;
}

.google-btn:hover {
  border-color: #ccc;
}

.google-icon {
  width: 20px;
  height: 20px;
}

.form-footer {
  text-align: center;
  margin-top: 30px;
}

.form-footer p {
  color: #666;
  font-size: 14px;
}

.login-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.login-link:hover {
  text-decoration: underline;
}

.register-image {
  background:
    linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9)),
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="a" patternUnits="userSpaceOnUse" width="100" height="100"><circle cx="50" cy="50" r="2" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="1000" height="1000" fill="url(%23a)"/></svg>');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 40px;
}

.image-content h3 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.3;
}

.image-content p {
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .register-container {
    grid-template-columns: 1fr;
    max-width: 500px;
  }

  .register-image {
    display: none;
  }

  .register-form-wrapper {
    padding: 30px 25px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
