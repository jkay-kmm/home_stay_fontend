<template>
  <!-- Top Contact Bar -->
  <div class="top-contact-bar">
    <div class="contact-container">
      <div class="contact-info">
        <span class="contact-item">
          <i class="location-icon">📍</i>
          No. 167 Mai Dich, Cau Giay, Hanoi
        </span>
        <span class="contact-item">
          <i class="phone-icon">📞</i>
          0242 2420 777
        </span>
      </div>
      <div class="social-links">
        <a href="#" class="social-link">
          <i class="social-icon twitter">🐦</i>
        </a>
        <a href="#" class="social-link">
          <i class="social-icon facebook">📘</i>
        </a>
        <a href="#" class="social-link">
          <i class="social-icon instagram">📷</i>
        </a>
        <div class="language-search">
          <select class="language-select">
            <option value="en">en</option>
            <option value="vi">vi</option>
          </select>
          <div class="search-box">
            <input type="text" placeholder="Enter Keywords" class="search-input" />
            <button class="search-btn">🔍</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Navigation -->
  <nav class="main-navbar">
    <div class="navbar-container">
      <!-- Left Menu -->
      <div class="nav-left">
        <router-link to="/" class="nav-link">HOME</router-link>
        <router-link to="/about" class="nav-link">ABOUT US</router-link>
        <router-link to="/rooms" class="nav-link">ROOMS & RATES</router-link>
      </div>

      <!-- Center Logo -->
      <div class="nav-logo">
        <router-link to="/" class="logo-link">
          <h1 class="hotel-name">Sunset Hotel</h1>
        </router-link>
      </div>

      <!-- Right Menu -->
      <div class="nav-right">
        <router-link to="/blog" class="nav-link">BLOG</router-link>
        <router-link to="/gallery" class="nav-link">GALLERY</router-link>
        <router-link to="/contact" class="nav-link">CONTACT</router-link>
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
        <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">HOME</router-link>
        <router-link to="/about" class="mobile-nav-link" @click="closeMobileMenu"
          >ABOUT US</router-link
        >
        <router-link to="/rooms" class="mobile-nav-link" @click="closeMobileMenu"
          >ROOMS & RATES</router-link
        >
        <router-link to="/blog" class="mobile-nav-link" @click="closeMobileMenu">BLOG</router-link>
        <router-link to="/gallery" class="mobile-nav-link" @click="closeMobileMenu"
          >GALLERY</router-link
        >
        <router-link to="/contact" class="mobile-nav-link" @click="closeMobileMenu"
          >CONTACT</router-link
        >
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
/* Top Contact Bar */
.top-contact-bar {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  padding: 8px 0;
  font-size: 13px;
  color: #6c757d;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contact-info {
  display: flex;
  gap: 30px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.location-icon,
.phone-icon {
  font-size: 12px;
}

.social-links {
  display: flex;
  align-items: center;
  gap: 15px;
}

.social-link {
  color: #6c757d;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: #495057;
}

.language-search {
  display: flex;
  align-items: center;
  gap: 15px;
}

.language-select {
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  background: white;
}

.search-box {
  display: flex;
  align-items: center;
}

.search-input {
  border: 1px solid #ced4da;
  border-right: none;
  border-radius: 4px 0 0 4px;
  padding: 4px 8px;
  font-size: 12px;
  width: 150px;
}

.search-btn {
  border: 1px solid #ced4da;
  border-left: none;
  border-radius: 0 4px 4px 0;
  background: white;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
}

/* Main Navigation */
.main-navbar {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 999;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

.nav-left,
.nav-right {
  display: flex;
  gap: 30px;
  flex: 1;
}

.nav-right {
  justify-content: flex-end;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #8b4513;
}

.nav-link.router-link-active {
  color: #8b4513;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #8b4513;
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

/* Logo */
.nav-logo {
  flex: 0 0 auto;
  text-align: center;
}

.logo-link {
  text-decoration: none;
}

.hotel-name {
  font-family: 'Georgia', serif;
  font-size: 28px;
  font-weight: 400;
  color: #8b4513;
  margin: 0;
  letter-spacing: 2px;
}

/* Mobile Menu */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.hamburger-line {
  width: 25px;
  height: 3px;
  background-color: #333;
  transition: all 0.3s ease;
}

.hamburger-line.active:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger-line.active:nth-child(2) {
  opacity: 0;
}

.hamburger-line.active:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.mobile-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transform: translateY(-10px);
  opacity: 0;
  transition: all 0.3s ease;
}

.mobile-menu.active {
  display: block;
  transform: translateY(0);
  opacity: 1;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.mobile-nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 16px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.mobile-auth {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mobile-auth-btn {
  text-decoration: none;
  padding: 12px 20px;
  border-radius: 6px;
  text-align: center;
  font-weight: 500;
  transition: all 0.3s ease;
}

.login-btn {
  background: transparent;
  color: #8b4513;
  border: 2px solid #8b4513;
}

.register-btn {
  background: #8b4513;
  color: white;
  border: 2px solid #8b4513;
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
}

.mobile-overlay.active {
  display: block;
}

/* Responsive */
@media (max-width: 768px) {
  .contact-info {
    flex-direction: column;
    gap: 10px;
  }

  .contact-container {
    flex-direction: column;
    gap: 10px;
  }

  .language-search {
    flex-direction: column;
    gap: 10px;
  }

  .search-input {
    width: 120px;
  }

  .nav-left,
  .nav-right {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .navbar-container {
    justify-content: space-between;
  }

  .hotel-name {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .top-contact-bar {
    display: none;
  }

  .navbar-container {
    padding: 0 15px;
    height: 60px;
  }

  .hotel-name {
    font-size: 20px;
    letter-spacing: 1px;
  }
}
</style>
} .nav-auth { display: flex; align-items: center; gap: 1rem; } .auth-btn { text-decoration: none;
padding: 0.5rem 1.5rem; border-radius: 8px; font-weight: 600; font-size: 0.9rem; transition: all
0.3s ease; } .login-btn { color: #667eea; border: 2px solid #667eea; background: transparent; }
.login-btn:hover { background: #667eea; color: white; } .register-btn { background:
linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: 2px solid transparent; }
.register-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
} .mobile-menu-btn { display: none; flex-direction: column; justify-content: center; align-items:
center; width: 30px; height: 30px; background: none; border: none; cursor: pointer; padding: 0; }
.hamburger-line { width: 25px; height: 3px; background: #333; margin: 3px 0; transition: all 0.3s
ease; border-radius: 3px; } .hamburger-line.active:nth-child(1) { transform: rotate(-45deg)
translate(-5px, 6px); } .hamburger-line.active:nth-child(2) { opacity: 0; }
.hamburger-line.active:nth-child(3) { transform: rotate(45deg) translate(-5px, -6px); } .mobile-menu
{ display: none; position: fixed; top: 100%; left: 0; right: 0; background: white; border-bottom:
1px solid rgba(0, 0, 0, 0.1); padding: 2rem; transform: translateY(-100%); transition: transform
0.3s ease; z-index: 999; } .mobile-menu.active { transform: translateY(0); } .mobile-nav-links {
display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2rem; } .mobile-nav-link {
text-decoration: none; color: #333; font-weight: 500; font-size: 1.1rem; padding: 0.5rem 0;
border-bottom: 1px solid rgba(0, 0, 0, 0.1); } .mobile-nav-link:hover { color: #667eea; }
.mobile-nav-link.router-link-active { color: #667eea; font-weight: 600; } .mobile-auth { display:
flex; flex-direction: column; gap: 1rem; } .mobile-auth-btn { text-decoration: none; padding: 1rem;
border-radius: 8px; font-weight: 600; text-align: center; transition: all 0.3s ease; }
.mobile-overlay { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background:
rgba(0, 0, 0, 0.5); z-index: 998; opacity: 0; transition: opacity 0.3s ease; }
.mobile-overlay.active { opacity: 1; } @media (max-width: 768px) { .nav-container { padding: 1rem; }
.nav-links, .nav-auth { display: none; } .mobile-menu-btn { display: flex; } .mobile-menu,
.mobile-overlay { display: block; } } @media (max-width: 480px) { .nav-container { padding: 0.75rem;
} .logo-link { font-size: 1.25rem; } }
