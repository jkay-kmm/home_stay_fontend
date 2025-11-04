<template>
  <div class="auth-modal" v-if="isVisible" @click="closeModal">
    <div class="auth-modal-content" @click.stop>
      <div class="auth-header">
        <h2>{{ isLoginMode ? 'Welcome Back' : 'Create Account' }}</h2>
        <button class="close-btn" @click="closeModal">&times;</button>
      </div>

      <!-- Auth Mode Toggle -->
      <div class="auth-toggle">
        <button :class="['toggle-btn', { active: isLoginMode }]" @click="isLoginMode = true">
          Login
        </button>
        <button :class="['toggle-btn', { active: !isLoginMode }]" @click="isLoginMode = false">
          Register
        </button>
      </div>

      <!-- Login Form -->
      <form v-if="isLoginMode" @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="loginEmail">Email *</label>
          <input
            type="email"
            id="loginEmail"
            v-model="loginForm.email"
            placeholder="Enter your email"
            required
            :disabled="isLoading"
          />
        </div>

        <div class="form-group">
          <label for="loginPassword">Password *</label>
          <div class="password-input">
            <input
              :type="showLoginPassword ? 'text' : 'password'"
              id="loginPassword"
              v-model="loginForm.password"
              placeholder="Enter your password"
              required
              :disabled="isLoading"
            />
            <button
              type="button"
              class="password-toggle"
              @click="showLoginPassword = !showLoginPassword"
              :disabled="isLoading"
            >
              {{ showLoginPassword ? '👁️' : '🙈' }}
            </button>
          </div>
        </div>

        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="loginForm.rememberMe" :disabled="isLoading" />
            Remember me
          </label>
          <a href="#" class="forgot-password">Forgot password?</a>
        </div>

        <button type="submit" class="auth-btn" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>

        <div class="auth-divider">
          <span>or continue with</span>
        </div>

        <div class="social-auth">
          <button type="button" class="social-btn google" :disabled="isLoading">
            <span class="social-icon">🔍</span>
            Google
          </button>
          <button type="button" class="social-btn facebook" :disabled="isLoading">
            <span class="social-icon">📘</span>
            Facebook
          </button>
        </div>
      </form>

      <!-- Register Form -->
      <form v-else @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label for="registerName">Full Name *</label>
          <input
            type="text"
            id="registerName"
            v-model="registerForm.name"
            placeholder="Enter your full name"
            required
            :disabled="isLoading"
          />
        </div>

        <div class="form-group">
          <label for="registerEmail">Email *</label>
          <input
            type="email"
            id="registerEmail"
            v-model="registerForm.email"
            placeholder="Enter your email"
            required
            :disabled="isLoading"
          />
        </div>

        <div class="form-group">
          <label for="registerPassword">Password *</label>
          <div class="password-input">
            <input
              :type="showRegisterPassword ? 'text' : 'password'"
              id="registerPassword"
              v-model="registerForm.password"
              placeholder="Create a password"
              required
              :disabled="isLoading"
            />
            <button
              type="button"
              class="password-toggle"
              @click="showRegisterPassword = !showRegisterPassword"
              :disabled="isLoading"
            >
              {{ showRegisterPassword ? '👁️' : '🙈' }}
            </button>
          </div>
          <div class="password-requirements">
            <small>Password must be at least 8 characters long</small>
          </div>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password *</label>
          <div class="password-input">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirmPassword"
              v-model="registerForm.confirmPassword"
              placeholder="Confirm your password"
              required
              :disabled="isLoading"
            />
            <button
              type="button"
              class="password-toggle"
              @click="showConfirmPassword = !showConfirmPassword"
              :disabled="isLoading"
            >
              {{ showConfirmPassword ? '👁️' : '🙈' }}
            </button>
          </div>
        </div>

        <div class="form-group">
          <label class="terms-agreement">
            <input
              type="checkbox"
              v-model="registerForm.agreeToTerms"
              required
              :disabled="isLoading"
            />
            I agree to the <a href="/terms" target="_blank">Terms of Service</a> and
            <a href="/privacy" target="_blank">Privacy Policy</a>
          </label>
        </div>

        <button type="submit" class="auth-btn" :disabled="isLoading || !registerForm.agreeToTerms">
          {{ isLoading ? 'Creating Account...' : 'Create Account' }}
        </button>

        <div class="auth-divider">
          <span>or continue with</span>
        </div>

        <div class="social-auth">
          <button type="button" class="social-btn google" :disabled="isLoading">
            <span class="social-icon">🔍</span>
            Google
          </button>
          <button type="button" class="social-btn facebook" :disabled="isLoading">
            <span class="social-icon">📘</span>
            Facebook
          </button>
        </div>
      </form>

      <!-- Error Messages -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useToast } from '@/composables/useToast.js'
import authService from '@/services/authService.js'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  defaultMode: {
    type: String,
    default: 'login', // 'login' or 'register'
  },
})

const emit = defineEmits(['close', 'auth-success'])

const { showToast } = useToast()

const isLoginMode = ref(props.defaultMode === 'login')
const isLoading = ref(false)
const errorMessage = ref('')

const showLoginPassword = ref(false)
const showRegisterPassword = ref(false)
const showConfirmPassword = ref(false)

const loginForm = reactive({
  email: '',
  password: '',
  rememberMe: false,
})

const registerForm = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
})

// Watch for mode changes to clear forms
watch(isLoginMode, () => {
  clearForms()
  errorMessage.value = ''
})

const clearForms = () => {
  // Reset login form
  Object.assign(loginForm, {
    email: '',
    password: '',
    rememberMe: false,
  })

  // Reset register form
  Object.assign(registerForm, {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  })

  // Reset password visibility
  showLoginPassword.value = false
  showRegisterPassword.value = false
  showConfirmPassword.value = false
}

const closeModal = () => {
  clearForms()
  errorMessage.value = ''
  emit('close')
}

const validateRegisterForm = () => {
  console.log('Validating register form:', {
    passwordLength: registerForm.password.length,
    passwordsMatch: registerForm.password === registerForm.confirmPassword,
    agreeToTerms: registerForm.agreeToTerms,
    formData: registerForm,
  })

  if (registerForm.password.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters long'
    console.log('Validation failed: Password too short')
    return false
  }

  if (registerForm.password !== registerForm.confirmPassword) {
    errorMessage.value = 'Passwords do not match'
    console.log('Validation failed: Passwords do not match')
    return false
  }

  if (!registerForm.agreeToTerms) {
    errorMessage.value = 'You must agree to the Terms of Service and Privacy Policy'
    console.log('Validation failed: Terms not agreed')
    return false
  }

  console.log('Validation passed!')
  return true
}

const handleLogin = async () => {
  if (isLoading.value) return

  errorMessage.value = ''
  isLoading.value = true

  try {
    console.log('Attempting login with:', loginForm.email)
    const result = await authService.login({
      email: loginForm.email,
      password: loginForm.password,
    })

    console.log('Login result:', result)

    if (result.success) {
      showToast({
        type: 'success',
        title: 'Welcome Back!',
        message: `Hello ${result.data.user.name}, you're successfully logged in.`,
        duration: 5000,
      })

      emit('auth-success', {
        type: 'login',
        user: result.data.user,
        token: result.data.token,
      })

      closeModal()
    } else {
      errorMessage.value = result.message
      showToast({
        type: 'error',
        title: 'Login Failed',
        message: result.message,
        duration: 5000,
      })
    }
  } catch {
    errorMessage.value = 'An unexpected error occurred. Please try again.'
    showToast({
      type: 'error',
      title: 'Error',
      message: 'An unexpected error occurred. Please try again.',
      duration: 5000,
    })
  } finally {
    isLoading.value = false
  }
}

const handleRegister = async () => {
  if (isLoading.value) return

  errorMessage.value = ''

  if (!validateRegisterForm()) {
    return
  }

  isLoading.value = true

  try {
    console.log('Attempting registration with:', {
      name: registerForm.name,
      email: registerForm.email,
      passwordLength: registerForm.password.length,
    })

    const result = await authService.register({
      name: registerForm.name,
      email: registerForm.email,
      password: registerForm.password,
    })

    if (result.success) {
      showToast({
        type: 'success',
        title: 'Welcome!',
        message: `Account created successfully. Welcome ${result.data.user.name}!`,
        duration: 5000,
      })

      emit('auth-success', {
        type: 'register',
        user: result.data.user,
        token: result.data.token,
      })

      closeModal()
    } else {
      errorMessage.value = result.message
      showToast({
        type: 'error',
        title: 'Registration Failed',
        message: result.message,
        duration: 5000,
      })
    }
  } catch {
    errorMessage.value = 'An unexpected error occurred. Please try again.'
    showToast({
      type: 'error',
      title: 'Error',
      message: 'An unexpected error occurred. Please try again.',
      duration: 5000,
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.auth-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.auth-modal-content {
  background: white;
  border-radius: 15px;
  max-width: 450px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.auth-header {
  padding: 30px 30px 20px;
  text-align: center;
  border-bottom: 1px solid #eee;
  position: relative;
}

.auth-header h2 {
  color: #8b4513;
  font-size: 1.8rem;
  margin: 0;
  font-weight: 600;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  color: #333;
  background: #f8f9fa;
}

.auth-toggle {
  display: flex;
  margin: 0 30px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e9ecef;
}

.toggle-btn {
  flex: 1;
  padding: 12px;
  background: #f8f9fa;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  color: #666;
}

.toggle-btn.active {
  background: #8b4513;
  color: white;
}

.auth-form {
  padding: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: #333;
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.form-group input[type='text'],
.form-group input[type='email'] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #8b4513;
  box-shadow: 0 0 0 2px rgba(139, 69, 19, 0.1);
}

.form-group input:disabled {
  background: #f8f9fa;
  cursor: not-allowed;
}

.password-input {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input input {
  width: 100%;
  padding: 12px 45px 12px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.password-toggle {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  color: #666;
  transition: color 0.3s ease;
}

.password-toggle:hover:not(:disabled) {
  color: #8b4513;
}

.password-toggle:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.password-requirements {
  margin-top: 5px;
}

.password-requirements small {
  color: #666;
  font-size: 0.8rem;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;
}

.remember-me input {
  width: auto;
  margin: 0;
}

.forgot-password {
  color: #8b4513;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #6b3410;
  text-decoration: underline;
}

.terms-agreement {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
  cursor: pointer;
}

.terms-agreement input {
  width: auto;
  margin: 0;
  margin-top: 2px;
}

.terms-agreement a {
  color: #8b4513;
  text-decoration: none;
}

.terms-agreement a:hover {
  text-decoration: underline;
}

.auth-btn {
  width: 100%;
  background: #8b4513;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.auth-btn:hover:not(:disabled) {
  background: #6b3410;
  transform: translateY(-2px);
}

.auth-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.auth-divider {
  text-align: center;
  margin: 20px 0;
  position: relative;
}

.auth-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e9ecef;
}

.auth-divider span {
  background: white;
  padding: 0 15px;
  color: #666;
  font-size: 0.9rem;
}

.social-auth {
  display: flex;
  gap: 10px;
}

.social-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  background: white;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.social-btn:hover:not(:disabled) {
  border-color: #8b4513;
  background: #f8f9fa;
}

.social-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.social-btn.google:hover:not(:disabled) {
  border-color: #4285f4;
  color: #4285f4;
}

.social-btn.facebook:hover:not(:disabled) {
  border-color: #1877f2;
  color: #1877f2;
}

.social-icon {
  font-size: 1.2rem;
}

.error-message {
  margin: 0 30px 20px;
  padding: 12px;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 6px;
  color: #c33;
  font-size: 0.9rem;
  text-align: center;
}

/* Responsive */
@media (max-width: 480px) {
  .auth-modal {
    padding: 10px;
  }

  .auth-modal-content {
    max-width: 100%;
  }

  .auth-header {
    padding: 25px 20px 15px;
  }

  .auth-header h2 {
    font-size: 1.5rem;
  }

  .auth-toggle {
    margin: 0 20px;
  }

  .auth-form {
    padding: 25px 20px;
  }

  .social-auth {
    flex-direction: column;
  }

  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
