<template>
  <section class="about">
    <div class="container">
      <h1>About Blue Hotel</h1>
       <p>
         Blue Hotel - Your home
         Blue Hotel is located in the west of Hanoi. Blue Hotel is a great destination and brings you the most enjoyable experience when you come to us. Come to Blue Hotel, you will be immersed in fresh nature, to participate in leisure activities, relax to take away the sorrows and chaos of life. Blue Hotel with all kinds of amenities and modern bungalows combined traditional style, restaurant system, conference room.
       </p>
       <p>
         Blue Hotel with fully furnished rooms and villas, interior space is decorated in luxurious style mixed with traditional Vietnamese and modern Western. We have well trained, professional and professional staff, dedicated service.
       </p>
      <!-- ...existing code... -->

      <div class="about-features">
        <div class="feature">
          <h3>🏨 Comfortable Rooms</h3>
          <p>Spacious, clean, and fully equipped for your stay.</p>
        </div>
        <div class="feature">
          <h3>🌅 Beautiful Location</h3>
          <p>Enjoy sunsets and easy access to local attractions.</p>
        </div>
        <div class="feature">
          <h3>💬 Friendly Service</h3>
          <p>Our staff is always ready to assist you 24/7.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// có thể thêm logic hoặc API call sau này nếu cần
</script>

<style scoped>
.about {
  color: #fff;
  background-color: #0f0f0f;
  min-height: 100vh;
  padding: 60px 20px;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  color: #d8a35f;
  margin-bottom: 20px;
}

p {
  line-height: 1.8;
  color: #ccc;
}

.about-features {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 40px;
}

.feature {
  width: 250px;
  margin-bottom: 20px;
}
</style>
