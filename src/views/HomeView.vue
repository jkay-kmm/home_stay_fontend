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
          <h1 class="hero-title">Explore wonderful homestays.</h1>
          <p class="hero-subtitle">Search for and book unique accommodations for your trip.</p>

          <!-- Search Form -->
          <div class="search-card">
            <form @submit.prevent="handleSearch" class="search-form">
              <div class="search-group">
                <label for="location">Location</label>
                <input
                  type="text"
                  id="location"
                  v-model="searchForm.location"
                  placeholder="Where do you want to go?"
                />
              </div>

              <div class="search-group">
                <label for="checkIn">Check-in date</label>
                <input type="date" id="checkIn" v-model="searchForm.checkIn" />
              </div>

              <div class="search-group">
                <label for="checkOut">Check-out date</label>
                <input type="date" id="checkOut" v-model="searchForm.checkOut" />
              </div>

              <div class="search-group">
                <label for="guests">number of guests</label>
                <select id="guests" v-model="searchForm.guests">
                  <option value="1">1 guest</option>
                  <option value="2">2 guests</option>
                  <option value="3">3 guests</option>
                  <option value="4">4 guests</option>
                  <option value="5">5+ guests</option>
                </select>
              </div>

              <button type="submit" class="search-btn">
                <svg class="search-icon" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Welcome Section -->
    <section class="welcome-section">
      <div class="welcome-container">
        <div class="welcome-content">
          <!-- Left Side - Image -->
          <div class="welcome-image">
            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop&crop=center"
              alt="Blue Hotel Terrace"
              class="welcome-img"
            />
          </div>

          <!-- Right Side - Content -->
          <div class="welcome-text">
            <div class="section-header">
              <span class="section-subtitle">ABOUT US</span>
              <h2 class="section-title">Blue Hotel - Your home</h2>
            </div>

            <div class="welcome-description">
              <p>
                Blue Hotel is located in the west of Hanoi. Blue Hotel is a great destination
                and brings you the most enjoyable experience when you come to us. Come to Blue
                Hotel, you will be immersed in fresh nature, to participate in leisure activities,
                relax to take away the sorrows and chaos of life. Blue Hotel with all kinds of
                amenities and modern bungalows combined traditional style, restaurant system,
                conference room.
              </p>

              <p>
                Blue Hotel with fully furnished rooms and villas, interior space is decorated in
                luxurious style mixed with traditional Vietnamese and modern Western. We have well
                trained, professional and professional staff, dedicated service.
              </p>
            </div>

            <button class="learn-more-btn">LEARN MORE</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Best Rooms Section -->
    <section class="best-rooms">
      <div class="rooms-container">
        <div class="section-header">
          <h2 class="section-title">OUR BEST ROOM</h2>
        </div>

        <div class="rooms-grid">
          <!-- Room 1 -->
          <div class="room-card">
            <div class="room-image">
              <img
                src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop&crop=center"
                alt="Senior De. City view"
                class="room-img"
              />
              <div class="room-overlay">
                <h3 class="room-name">Senior De. City view</h3>
                <p class="room-price">$ 77 / night</p>
              </div>
            </div>
          </div>

          <!-- Room 2 -->
          <div class="room-card">
            <div class="room-image">
              <img
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop&crop=center"
                alt="Connecting Room"
                class="room-img"
              />
              <div class="room-overlay">
                <h3 class="room-name">Connecting Room</h3>
                <p class="room-price">$ 116 / night</p>
              </div>
            </div>
          </div>

          <!-- Room 3 -->
          <div class="room-card">
            <div class="room-image">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop&crop=center"
                alt="Balcony Triple Suite"
                class="room-img"
              />
              <div class="room-overlay">
                <h3 class="room-name">Balcony Triple Suite</h3>
                <p class="room-price">$ 88 / night</p>
              </div>
            </div>
          </div>

          <!-- Room 4 -->
          <div class="room-card">
            <div class="room-image">
              <img
                src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop&crop=center"
                alt="Balcony Family Suite"
                class="room-img"
              />
              <div class="room-overlay">
                <h3 class="room-name">Balcony Family Suite</h3>
                <p class="room-price">$ 102 / night</p>
              </div>
            </div>
          </div>
        </div>

        <div class="see-all-container">
          <router-link to="/rooms" class="see-all-btn">SEE ALL ROOMS</router-link>
        </div>
      </div>
    </section>

    <!-- Welcome to Blue Hotel Section -->
    <section class="welcome-blue">
      <div class="welcome-blue-container">
        <!-- Header -->
        <div class="welcome-header">
          <h1 class="welcome-title">
            WELCOME TO <span class="blue-highlight">Blue HOTEL</span>
          </h1>
        </div>

        <div class="welcome-content-layout">
          <!-- Left Side - Hotel Image -->
          <div class="hotel-image-section">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&h=500&fit=crop&crop=center"
              alt="Blue Hotel Terrace"
              class="hotel-image"
            />
          </div>

          <!-- Right Side - About Content -->
          <div class="about-content">
            <div class="about-header">
              <span class="about-subtitle">ABOUT US</span>
              <h2 class="about-title">Blue Hotel - Your home</h2>
            </div>

            <div class="about-description">
              <p>
                Blue Hotel is located in the west of Hanoi. Blue Hotel is a great destination
                and brings you the most enjoyable experience when you come to us. Come to Blue
                Hotel, you will be immersed in fresh nature, to participate in leisure activities,
                relax to take away the sorrows and chaos of life. Blue Hotel with all kinds of
                amenities and modern bungalows combined traditional style, restaurant system,
                conference room.
              </p>

              <p>
                Blue Hotel with fully furnished rooms and villas, interior space is decorated in
                luxurious style mixed with traditional Vietnamese and modern Western. We have well
                trained, professional and professional staff, dedicated service.
              </p>
            </div>

            <button class="learn-more-button">LEARN MORE</button>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
// THEMAPISAU
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
  background: url('@/assets/anhnen.jpg') center center / cover no-repeat;
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

/* Welcome to Blue Hotel Section */
.welcome-blue {
  padding: 100px 0;
  background: #ffffff;
}

.welcome-blue-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.welcome-header {
  text-align: center;
  margin-bottom: 80px;
}

.welcome-title {
  font-size: 3rem;
  font-weight: 300;
  color: #6c757d;
  letter-spacing: 3px;
  margin: 0;
  text-transform: uppercase;
}

.blue-highlight {
  color: #d4a574;
}

.welcome-content-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.hotel-image-section {
  position: relative;
}

.hotel-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 0;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.about-content {
  padding: 40px 0;
}

.about-header {
  margin-bottom: 40px;
}

.about-subtitle {
  display: block;
  color: #d4a574;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 15px;
}

.about-title {
  font-size: 2.8rem;
  font-weight: 300;
  color: #495057;
  margin: 0;
  line-height: 1.2;
}

.about-description {
  margin-bottom: 50px;
}

.about-description p {
  color: #6c757d;
  line-height: 1.8;
  margin-bottom: 25px;
  font-size: 1rem;
  text-align: justify;
}

.learn-more-button {
  background: transparent;
  color: #d4a574;
  border: 1px solid #d4a574;
  padding: 12px 30px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 0;
}

.learn-more-button:hover {
  background: #d4a574;
  color: white;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
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

/* Welcome Section */
.welcome-section {
  padding: 100px 0;
  background: #f8f9fa;
}

.welcome-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.welcome-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.welcome-image {
  position: relative;
}

.welcome-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.welcome-text {
  padding: 20px 0;
}

.section-header {
  margin-bottom: 30px;
}

.section-subtitle {
  color: #d4a574;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 10px;
  display: block;
}

.welcome-text .section-title {
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 300;
  margin: 0;
  line-height: 1.2;
}

.welcome-description {
  margin-bottom: 40px;
}

.welcome-description p {
  color: #666;
  line-height: 1.8;
  margin-bottom: 20px;
  font-size: 1rem;
}

.learn-more-btn {
  background: transparent;
  color: #d4a574;
  border: 2px solid #d4a574;
  padding: 12px 30px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.learn-more-btn:hover {
  background: #d4a574;
  color: white;
}

/* Best Rooms Section */
.best-rooms {
  padding: 100px 0;
  background: white;
}

.rooms-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.best-rooms .section-header {
  text-align: center;
  margin-bottom: 60px;
}

.best-rooms .section-title {
  color: #d4a574;
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 0;
}

.rooms-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 60px;
}

.room-card {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.room-card:hover {
  transform: translateY(-5px);
}

.room-image {
  position: relative;
  overflow: hidden;
}

.room-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.room-card:hover .room-img {
  transform: scale(1.05);
}

.room-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 30px 20px 20px;
}

.room-name {
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 8px;
  color: white;
}

.room-price {
  font-size: 1.1rem;
  font-weight: 500;
  color: #d4a574;
  margin: 0;
}

.see-all-container {
  text-align: center;
}

.see-all-btn {
  display: inline-block;
  background: transparent;
  color: #d4a574;
  border: 2px solid #d4a574;
  padding: 15px 40px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.see-all-btn:hover {
  background: #d4a574;
  color: white;
  transform: translateY(-2px);
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

  /* Welcome to Blue Hotel Mobile */
  .welcome-blue {
    padding: 60px 0;
  }

  .welcome-title {
    font-size: 2rem;
    letter-spacing: 2px;
  }

  .welcome-content-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .hotel-image {
    height: 300px;
  }

  .about-title {
    font-size: 2rem;
  }

  .about-content {
    padding: 20px 0;
    text-align: center;
  }

  .about-description p {
    text-align: left;
  }

  .learn-more-button {
    width: 100%;
    max-width: 250px;
  }

  /* Welcome Section Mobile */
  .welcome-section {
    padding: 60px 0;
  }

  .welcome-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }

  .welcome-text .section-title {
    font-size: 2rem;
  }

  .welcome-img {
    height: 300px;
  }

  /* Best Rooms Mobile */
  .best-rooms {
    padding: 60px 0;
  }

  .best-rooms .section-title {
    font-size: 2rem;
    letter-spacing: 2px;
  }

  .rooms-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .room-img {
    height: 250px;
  }

  .room-overlay {
    padding: 20px 15px 15px;
  }

  .room-name {
    font-size: 1.1rem;
  }

  .room-price {
    font-size: 1rem;
  }
}
</style>
