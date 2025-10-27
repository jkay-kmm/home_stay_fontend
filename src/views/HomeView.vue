<script setup>
import { ref } from 'vue'

const searchForm = ref({
  location: '',
  checkIn: '',
  checkOut: '',
  guests: 1,
})

const handleSearch = () => {
  console.log('Search form:', searchForm.value)
  // TODO: Implement search functionality
}
</script>

<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-background">
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <div class="container">
          <h1 class="hero-title">Khám phá những homestay tuyệt vời</h1>
          <p class="hero-subtitle">Tìm kiếm và đặt phòng lưu trú độc đáo cho chuyến đi của bạn</p>

          <!-- Search Form -->
          <div class="search-card">
            <form @submit.prevent="handleSearch" class="search-form">
              <div class="search-group">
                <label for="location">Địa điểm</label>
                <input
                  type="text"
                  id="location"
                  v-model="searchForm.location"
                  placeholder="Bạn muốn đi đâu?"
                />
              </div>

              <div class="search-group">
                <label for="checkIn">Ngày nhận phòng</label>
                <input type="date" id="checkIn" v-model="searchForm.checkIn" />
              </div>

              <div class="search-group">
                <label for="checkOut">Ngày trả phòng</label>
                <input type="date" id="checkOut" v-model="searchForm.checkOut" />
              </div>

              <div class="search-group">
                <label for="guests">Số khách</label>
                <select id="guests" v-model="searchForm.guests">
                  <option value="1">1 khách</option>
                  <option value="2">2 khách</option>
                  <option value="3">3 khách</option>
                  <option value="4">4 khách</option>
                  <option value="5">5+ khách</option>
                </select>
              </div>

              <button type="submit" class="search-btn">
                <svg class="search-icon" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                Tìm kiếm
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">Tại sao chọn chúng tôi?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
            </div>
            <h3>Đặt phòng dễ dàng</h3>
            <p>Quy trình đặt phòng đơn giản, nhanh chóng chỉ với vài click chuột</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
            </div>
            <h3>Chất lượng đảm bảo</h3>
            <p>Tất cả homestay đều được kiểm duyệt kỹ càng về chất lượng và tiện nghi</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 16.92V18C22 18.5304 21.7893 19.0391 21.4142 19.4142C21.0391 19.7893 20.5304 20 20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V16.92L12 12L22 16.92Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
            </div>
            <h3>Hỗ trợ 24/7</h3>
            <p>Đội ngũ hỗ trợ khách hàng luôn sẵn sàng giúp đỡ bạn mọi lúc mọi nơi</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Destinations -->
    <section class="destinations">
      <div class="container">
        <h2 class="section-title">Điểm đến phổ biến</h2>
        <div class="destinations-grid">
          <div class="destination-card">
            <div class="destination-image">
              <div class="destination-overlay">
                <h3>Hà Nội</h3>
                <p>120+ homestay</p>
              </div>
            </div>
          </div>

          <div class="destination-card">
            <div class="destination-image">
              <div class="destination-overlay">
                <h3>Đà Lạt</h3>
                <p>85+ homestay</p>
              </div>
            </div>
          </div>

          <div class="destination-card">
            <div class="destination-image">
              <div class="destination-overlay">
                <h3>Sapa</h3>
                <p>95+ homestay</p>
              </div>
            </div>
          </div>

          <div class="destination-card">
            <div class="destination-image">
              <div class="destination-overlay">
                <h3>Hội An</h3>
                <p>75+ homestay</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2>Sẵn sàng cho chuyến đi tiếp theo?</h2>
          <p>Đăng ký ngay để nhận những ưu đãi đặc biệt và khám phá thế giới homestay</p>
          <div class="cta-buttons">
            <router-link to="/register" class="cta-btn primary">Đăng ký ngay</router-link>
            <router-link to="/login" class="cta-btn secondary">Đăng nhập</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
}

.hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="1000" height="1000" fill="url(%23grid)"/></svg>');
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  text-align: center;
  color: white;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.search-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
}

.search-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  align-items: end;
}

.search-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.search-group label {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.search-group input,
.search-group select {
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.search-group input:focus,
.search-group select:focus {
  outline: none;
  border-color: #667eea;
}

.search-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: transform 0.2s ease;
}

.search-btn:hover {
  transform: translateY(-1px);
}

.search-icon {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #333;
}

.features {
  padding: 5rem 0;
  background: #f8f9fa;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
  color: #667eea;
}

.feature-icon svg {
  width: 100%;
  height: 100%;
}

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

.destinations {
  padding: 5rem 0;
}

.destinations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.destination-card {
  border-radius: 16px;
  overflow: hidden;
  height: 300px;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.destination-card:hover {
  transform: scale(1.05);
}

.destination-image {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.destination-overlay {
  text-align: center;
  color: white;
}

.destination-overlay h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.destination-overlay p {
  opacity: 0.9;
}

.cta {
  padding: 5rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cta-btn.primary {
  background: white;
  color: #667eea;
}

.cta-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.3);
}

.cta-btn.secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.cta-btn.secondary:hover {
  background: white;
  color: #667eea;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .search-card {
    padding: 1.5rem;
  }

  .search-form {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 2rem;
  }

  .features,
  .destinations,
  .cta {
    padding: 3rem 0;
  }

  .cta-content h2 {
    font-size: 2rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .cta-btn {
    width: 200px;
  }
}
</style>
