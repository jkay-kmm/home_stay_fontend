<template>
  <div class="rooms-page">
    <div class="hero-section">
      <h1>Rooms & Rates</h1>
      <p>Discover our comfortable and luxurious accommodations</p>
    </div>

    <div class="rooms-container">
      <div class="room-card">
        <img
          src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=300&h=200&fit=crop&crop=center"
          alt="Deluxe Room"
          class="room-image"
        />
        <div class="room-info">
          <h3>Deluxe Room</h3>
          <p>Spacious room with modern amenities and city view</p>
          <div class="room-price">$120/night</div>
          <button class="book-btn">Book Now</button>
        </div>
      </div>

      <div class="room-card">
        <img
          src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=300&h=200&fit=crop&crop=center"
          alt="Superior Room"
          class="room-image"
        />
        <div class="room-info">
          <h3>Superior Room</h3>
          <p>Elegant room with premium facilities and garden view</p>
          <div class="room-price">$150/night</div>
          <button class="book-btn">Book Now</button>
        </div>
      </div>

      <div class="room-card">
        <img
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop&crop=center"
          alt="Suite"
          class="room-image"
        />
        <div class="room-info">
          <h3>Executive Suite</h3>
          <p>Luxury suite with separate living area and panoramic view</p>
          <div class="room-price">$200/night</div>
          <button class="book-btn">Book Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Room booking logic will be added here
</script>

<style scoped>
.rooms-page {
  padding: 40px 20px;
}

.hero-section {
  text-align: center;
  margin-bottom: 60px;
}

.hero-section h1 {
  font-size: 2.5rem;
  color: #8b4513;
  margin-bottom: 10px;
}

.hero-section p {
  font-size: 1.2rem;
  color: #666;
}

.rooms-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.room-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.room-card:hover {
  transform: translateY(-5px);
}

.room-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.room-info {
  padding: 20px;
}

.room-info h3 {
  font-size: 1.5rem;
  color: #8b4513;
  margin-bottom: 10px;
}

.room-info p {
  color: #666;
  margin-bottom: 15px;
}

.room-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #8b4513;
  margin-bottom: 15px;
}

.book-btn {
  background: #8b4513;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
  width: 100%;
}

.book-btn:hover {
  background: #6b3410;
}
</style>
