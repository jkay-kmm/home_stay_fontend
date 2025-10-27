<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Logo -->
      <div class="nav-logo">
        <router-link to="/" class="logo-link">
          <svg class="logo-icon" viewBox="0 0 24 24" fill="none">
            <path d="M3 12L5 10L12 17L22 7L20 5L12 13L7 8L3 12Z" fill="currentColor" />
          </svg>
          <span class="logo-text">HomeStay</span>
        </router-link>
      </div>

      <!-- Desktop Navigation Links -->
      <div class="nav-links">
        <router-link to="/" class="nav-link">Trang chủ</router-link>
        <router-link to="/about" class="nav-link">Giới thiệu</router-link>
        <a href="#" class="nav-link">Khám phá</a>
        <a href="#" class="nav-link">Liên hệ</a>
      </div>

      <!-- Auth Buttons -->
      <div class="nav-auth">
        <router-link to="/login" class="auth-btn login-btn">Đăng nhập</router-link>
        <router-link to="/register" class="auth-btn register-btn">Đăng ký</router-link>
      </div>

      <!-- Mobile Menu Button -->
      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        <span class="hamburger-line" :class="{ active: isMobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ active: isMobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ active: isMobileMenuOpen }"></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ active: isMobileMenuOpen }">
      <div class="mobile-nav-links">
        <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">Trang chủ</router-link>
        <router-link to="/about" class="mobile-nav-link" @click="closeMobileMenu"
          >Giới thiệu</router-link
        >
        <a href="#" class="mobile-nav-link" @click="closeMobileMenu">Khám phá</a>
        <a href="#" class="mobile-nav-link" @click="closeMobileMenu">Liên hệ</a>
      </div>
      <div class="mobile-auth">
        <router-link to="/login" class="mobile-auth-btn login-btn" @click="closeMobileMenu"
          >Đăng nhập</router-link
        >
        <router-link to="/register" class="mobile-auth-btn register-btn" @click="closeMobileMenu"
          >Đăng ký</router-link
        >
      </div>
    </div>

    <!-- Overlay -->
    <div
      class="mobile-overlay"
      :class="{ active: isMobileMenuOpen }"
      @click="closeMobileMenu"
    ></div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0;
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
}

.nav-logo {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #333;
  font-weight: 700;
  font-size: 1.5rem;
}

.logo-icon {
  width: 32px;
  height: 32px;
  color: #667eea;
}

.logo-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #667eea;
}

.nav-link.router-link-active {
  color: #667eea;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1px;
}

.nav-auth {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.auth-btn {
  text-decoration: none;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.login-btn {
  color: #667eea;
  border: 2px solid #667eea;
  background: transparent;
}

.login-btn:hover {
  background: #667eea;
  color: white;
}

.register-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: 2px solid transparent;
}

.register-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.hamburger-line {
  width: 25px;
  height: 3px;
  background: #333;
  margin: 3px 0;
  transition: all 0.3s ease;
  border-radius: 3px;
}

.hamburger-line.active:nth-child(1) {
  transform: rotate(-45deg) translate(-5px, 6px);
}

.hamburger-line.active:nth-child(2) {
  opacity: 0;
}

.hamburger-line.active:nth-child(3) {
  transform: rotate(45deg) translate(-5px, -6px);
}

.mobile-menu {
  display: none;
  position: fixed;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 2rem;
  transform: translateY(-100%);
  transition: transform 0.3s ease;
  z-index: 999;
}

.mobile-menu.active {
  transform: translateY(0);
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.mobile-nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.mobile-nav-link:hover {
  color: #667eea;
}

.mobile-nav-link.router-link-active {
  color: #667eea;
  font-weight: 600;
}

.mobile-auth {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mobile-auth-btn {
  text-decoration: none;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
}

.mobile-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.mobile-overlay.active {
  opacity: 1;
}

@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
  }

  .nav-links,
  .nav-auth {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .mobile-menu,
  .mobile-overlay {
    display: block;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0.75rem;
  }

  .logo-link {
    font-size: 1.25rem;
  }

  .logo-icon {
    width: 28px;
    height: 28px;
  }
}
</style>
