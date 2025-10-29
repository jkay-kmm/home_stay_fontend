<template>
  <div class="location-page">
    <div class="hero-section">
      <h1>Location & Map</h1>
      <p>Find us in the heart of Hanoi</p>
    </div>

    <div class="location-container">
      <!-- Map Section -->
      <div class="map-section">
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8639810914293!2d105.7936!3d21.0354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDAyJzA3LjQiTiAxMDXCsDQ3JzM3LjAiRQ!5e0!3m2!1sen!2s!4v1635789012345!5m2!1sen!2s"
            width="100%"
            height="500"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <!-- Location Information -->
      <div class="location-info">
        <div class="info-grid">
          <div class="info-card">
            <div class="info-icon">📍</div>
            <h3>Address</h3>
            <p>
              Sunset Hotel Grand<br />
              No. 167 Mai Dich<br />
              Cau Giay District<br />
              Hanoi, Vietnam
            </p>
          </div>

          <div class="info-card">
            <div class="info-icon">🚗</div>
            <h3>From Airport</h3>
            <p>
              Noi Bai International Airport<br />
              Distance: 35 km<br />
              Driving time: 45-60 minutes<br />
              Taxi fare: ~600,000 VND
            </p>
          </div>

          <div class="info-card">
            <div class="info-icon">🚇</div>
            <h3>Public Transport</h3>
            <p>
              Nearest Metro: Cau Giay Station<br />
              Distance: 500m walk<br />
              Bus routes: 7, 34, 43<br />
              Bus stop: Mai Dich
            </p>
          </div>

          <div class="info-card">
            <div class="info-icon">🏛️</div>
            <h3>Nearby Attractions</h3>
            <p>
              Ho Chi Minh Mausoleum: 5 km<br />
              Temple of Literature: 3 km<br />
              Hoan Kiem Lake: 8 km<br />
              Old Quarter: 10 km
            </p>
          </div>

          <div class="info-card">
            <div class="info-icon">🛒</div>
            <h3>Shopping & Dining</h3>
            <p>
              Lotte Center: 2 km<br />
              Keangnam Landmark: 1.5 km<br />
              Big C Thang Long: 1 km<br />
              Local restaurants nearby
            </p>
          </div>

          <div class="info-card">
            <div class="info-icon">🏥</div>
            <h3>Essential Services</h3>
            <p>
              Vinmec Hospital: 3 km<br />
              French Hospital: 4 km<br />
              ATM/Banks: 200m<br />
              Pharmacy: 150m
            </p>
          </div>
        </div>
      </div>

      <!-- Transportation Options -->
      <div class="transportation-section">
        <h2>Transportation Options</h2>
        <div class="transport-grid">
          <div class="transport-card">
            <div class="transport-icon">🚕</div>
            <h4>Taxi Services</h4>
            <ul>
              <li>Grab - Available 24/7</li>
              <li>Mai Linh Taxi - +84 24 3833 3333</li>
              <li>Taxi Group - +84 24 3853 5353</li>
            </ul>
          </div>

          <div class="transport-card">
            <div class="transport-icon">🚌</div>
            <h4>Airport Shuttle</h4>
            <ul>
              <li>Hotel shuttle service available</li>
              <li>Advance booking required</li>
              <li>Cost: 500,000 VND per trip</li>
              <li>Contact reception for booking</li>
            </ul>
          </div>

          <div class="transport-card">
            <div class="transport-icon">🏍️</div>
            <h4>Motorbike Taxi</h4>
            <ul>
              <li>Grab Bike - Mobile app</li>
              <li>Local xe om available</li>
              <li>Quick for short distances</li>
              <li>Helmet provided</li>
            </ul>
          </div>

          <div class="transport-card">
            <div class="transport-icon">🚲</div>
            <h4>Bicycle Rental</h4>
            <ul>
              <li>Hotel bicycle rental service</li>
              <li>Daily rate: 100,000 VND</li>
              <li>Explore the neighborhood</li>
              <li>Lock and helmet included</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Directions Section -->
      <div class="directions-section">
        <h2>Directions</h2>
        <div class="directions-grid">
          <div class="direction-card">
            <h4>From Noi Bai Airport</h4>
            <ol>
              <li>Exit airport and take Airport Expressway</li>
              <li>Continue on Thang Long Avenue</li>
              <li>Turn right onto Mai Dich Street</li>
              <li>Hotel is on the right at No. 167</li>
            </ol>
          </div>

          <div class="direction-card">
            <h4>From Hanoi Railway Station</h4>
            <ol>
              <li>Head northwest on Tran Quy Cap</li>
              <li>Turn right onto Giang Vo</li>
              <li>Continue to Chua Lang intersection</li>
              <li>Turn left onto Mai Dich Street</li>
            </ol>
          </div>

          <div class="direction-card">
            <h4>From Old Quarter</h4>
            <ol>
              <li>Head west on Hang Khay</li>
              <li>Continue onto Trang Tien</li>
              <li>Turn right onto Kim Ma</li>
              <li>Follow to Mai Dich intersection</li>
            </ol>
          </div>

          <div class="direction-card">
            <h4>Parking Information</h4>
            <ul>
              <li>Free valet parking available</li>
              <li>Underground parking garage</li>
              <li>24-hour security</li>
              <li>Electric car charging stations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Location and map page
</script>

<style scoped>
.location-page {
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

.location-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Map Section */
.map-section {
  margin-bottom: 60px;
}

.map-container {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* Location Information */
.location-info {
  margin-bottom: 60px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
}

.info-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
}

.info-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.info-card h3 {
  color: #8b4513;
  font-size: 1.3rem;
  margin-bottom: 15px;
}

.info-card p {
  color: #666;
  line-height: 1.6;
}

/* Transportation Section */
.transportation-section,
.directions-section {
  margin-bottom: 60px;
}

.transportation-section h2,
.directions-section h2 {
  color: #8b4513;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 40px;
}

.transport-grid,
.directions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.transport-card,
.direction-card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.transport-icon {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 15px;
}

.transport-card h4,
.direction-card h4 {
  color: #8b4513;
  font-size: 1.2rem;
  margin-bottom: 15px;
  text-align: center;
}

.transport-card ul,
.direction-card ul,
.direction-card ol {
  color: #666;
  line-height: 1.6;
  padding-left: 20px;
}

.transport-card li,
.direction-card li {
  margin-bottom: 8px;
}

.direction-card ol {
  counter-reset: step-counter;
}

.direction-card ol li {
  counter-increment: step-counter;
  position: relative;
  padding-left: 10px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .transport-grid,
  .directions-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .info-card,
  .transport-card,
  .direction-card {
    padding: 20px;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .transportation-section h2,
  .directions-section h2 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .map-container iframe {
    height: 300px;
  }

  .info-icon,
  .transport-icon {
    font-size: 2rem;
  }

  .location-page {
    padding: 20px 15px;
  }
}
</style>
