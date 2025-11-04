<template>
  <div class="rooms-page">
    <div class="hero-section">
      <h1>Rooms & Rates</h1>
      <p>Discover our comfortable and luxurious accommodations</p>
    </div>

    <!-- Room Filters -->
    <div class="filters-section">
      <div class="filters-container">
        <div class="filter-group">
          <label for="dateRange">Check-in / Check-out</label>
          <div class="date-inputs">
            <input type="date" v-model="filters.checkIn" :min="today" />
            <input type="date" v-model="filters.checkOut" :min="filters.checkIn || today" />
          </div>
        </div>

        <div class="filter-group">
          <label for="guests">Guests</label>
          <select v-model="filters.guests">
            <option v-for="n in 8" :key="n" :value="n">
              {{ n }} {{ n === 1 ? 'Guest' : 'Guests' }}
            </option>
          </select>
        </div>

        <div class="filter-group">
          <label for="priceRange">Price Range</label>
          <select v-model="filters.priceRange">
            <option value="">All Prices</option>
            <option value="0-150">$0 - $150</option>
            <option value="150-200">$150 - $200</option>
            <option value="200+">$200+</option>
          </select>
        </div>

        <button class="search-btn" @click="applyFilters">Search Rooms</button>
      </div>
    </div>

    <div class="rooms-container">
      <div class="room-card" v-for="room in filteredRooms" :key="room.id">
        <div class="room-gallery">
          <img
            :src="room.images[currentImageIndex[room.id] || 0]"
            :alt="room.name"
            class="room-image"
          />
          <div class="gallery-nav" v-if="room.images.length > 1">
            <button
              class="nav-btn prev"
              @click="previousImage(room.id)"
              :disabled="(currentImageIndex[room.id] || 0) === 0"
            >
              ◀
            </button>
            <button
              class="nav-btn next"
              @click="nextImage(room.id)"
              :disabled="(currentImageIndex[room.id] || 0) === room.images.length - 1"
            >
              ▶
            </button>
          </div>
          <div class="image-indicators" v-if="room.images.length > 1">
            <span
              v-for="(image, index) in room.images"
              :key="index"
              class="indicator"
              :class="{ active: index === (currentImageIndex[room.id] || 0) }"
              @click="currentImageIndex[room.id] = index"
            ></span>
          </div>
        </div>

        <div class="room-info">
          <h3>{{ room.name }}</h3>
          <p class="room-description">{{ room.description }}</p>

          <div class="room-features">
            <span v-for="feature in room.features" :key="feature" class="feature">
              {{ feature }}
            </span>
          </div>

          <div class="room-amenities">
            <div class="amenity" v-for="amenity in room.amenities" :key="amenity.name">
              <span class="amenity-icon">{{ amenity.icon }}</span>
              <span class="amenity-name">{{ amenity.name }}</span>
            </div>
          </div>

          <div class="room-pricing">
            <div class="price-info">
              <span class="room-price">${{ room.price }}</span>
              <span class="price-unit">/night</span>
            </div>
            <div class="pricing-note">
              <small>*Prices may vary by season</small>
            </div>
          </div>

          <div class="room-actions">
            <button class="details-btn" @click="viewRoomDetails(room)">View Details</button>
            <button class="book-btn" @click="bookRoom(room)">Book Now</button>
          </div>
        </div>
      </div>
    </div>

    <!-- No rooms found message -->
    <div v-if="filteredRooms.length === 0" class="no-rooms">
      <h3>No rooms found</h3>
      <p>Try adjusting your search criteria</p>
    </div>

    <!-- Booking Form Modal -->
    <BookingForm
      :is-visible="showBookingForm"
      @close="showBookingForm = false"
      @booking-submitted="handleBookingSubmitted"
    />

    <!-- Room Details Modal -->
    <div class="room-modal" v-if="selectedRoom" @click="closeRoomDetails">
      <div class="room-modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedRoom.name }}</h2>
          <button class="close-btn" @click="closeRoomDetails">&times;</button>
        </div>

        <div class="modal-gallery">
          <img
            :src="selectedRoom.images[modalImageIndex]"
            :alt="selectedRoom.name"
            class="modal-image"
          />
          <div class="modal-gallery-nav" v-if="selectedRoom.images.length > 1">
            <button
              class="nav-btn prev"
              @click="modalImageIndex = Math.max(0, modalImageIndex - 1)"
              :disabled="modalImageIndex === 0"
            >
              ◀
            </button>
            <button
              class="nav-btn next"
              @click="
                modalImageIndex = Math.min(selectedRoom.images.length - 1, modalImageIndex + 1)
              "
              :disabled="modalImageIndex === selectedRoom.images.length - 1"
            >
              ▶
            </button>
          </div>
        </div>

        <div class="modal-info">
          <div class="room-details">
            <h3>Room Details</h3>
            <p>{{ selectedRoom.fullDescription }}</p>

            <div class="details-grid">
              <div class="detail-item"><strong>Size:</strong> {{ selectedRoom.size }}</div>
              <div class="detail-item">
                <strong>Occupancy:</strong> {{ selectedRoom.occupancy }}
              </div>
              <div class="detail-item"><strong>Bed Type:</strong> {{ selectedRoom.bedType }}</div>
              <div class="detail-item"><strong>View:</strong> {{ selectedRoom.view }}</div>
            </div>

            <div class="amenities-full">
              <h4>Amenities</h4>
              <div class="amenities-grid">
                <div class="amenity" v-for="amenity in selectedRoom.amenities" :key="amenity.name">
                  <span class="amenity-icon">{{ amenity.icon }}</span>
                  <span class="amenity-name">{{ amenity.name }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-actions">
            <div class="price-display">
              <span class="modal-price">${{ selectedRoom.price }}/night</span>
            </div>
            <button class="book-modal-btn" @click="bookRoom(selectedRoom)">Book This Room</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import BookingForm from '@/components/BookingForm.vue'
import { useToast } from '@/composables/useToast.js'

const { showToast } = useToast()
const showBookingForm = ref(false)
const selectedRoom = ref(null)
const modalImageIndex = ref(0)
const currentImageIndex = reactive({})

const today = new Date().toISOString().split('T')[0]

const filters = reactive({
  checkIn: '',
  checkOut: '',
  guests: 2,
  priceRange: '',
})

const rooms = ref([
  {
    id: 1,
    name: 'Deluxe Room',
    description: 'Spacious room with modern amenities and city view',
    fullDescription:
      'Our Deluxe Room offers a perfect blend of comfort and style. Featuring contemporary furnishings, premium bedding, and a spacious layout, this room is ideal for both business and leisure travelers. Enjoy stunning city views from your private balcony while experiencing our exceptional hospitality.',
    price: 120,
    size: '35 sqm',
    occupancy: 'Up to 2 adults',
    bedType: 'King or Twin beds',
    view: 'City view',
    features: ['Free WiFi', 'Air Conditioning', 'Mini Bar'],
    amenities: [
      { name: 'Free WiFi', icon: '📶' },
      { name: 'Air Conditioning', icon: '❄️' },
      { name: 'Mini Bar', icon: '🍷' },
      { name: 'Safe Box', icon: '🔒' },
      { name: 'Flat Screen TV', icon: '📺' },
      { name: 'Work Desk', icon: '💼' },
      { name: 'Balcony', icon: '🏞️' },
      { name: 'Room Service', icon: '🛎️' },
    ],
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop&crop=center',
    ],
  },
  {
    id: 2,
    name: 'Superior Room',
    description: 'Elegant room with premium facilities and garden view',
    fullDescription:
      'Indulge in luxury with our Superior Room, featuring elegant décor and premium amenities. This spacious accommodation offers a serene garden view, marble bathroom with rainfall shower, and exclusive access to our executive lounge. Perfect for guests seeking an elevated experience.',
    price: 150,
    size: '42 sqm',
    occupancy: 'Up to 2 adults + 1 child',
    bedType: 'King bed',
    view: 'Garden view',
    features: ['Executive Lounge Access', 'Premium Toiletries', 'Complimentary Breakfast'],
    amenities: [
      { name: 'Executive Lounge', icon: '🥂' },
      { name: 'Premium Toiletries', icon: '🧴' },
      { name: 'Breakfast Included', icon: '🥐' },
      { name: 'Marble Bathroom', icon: '🛁' },
      { name: 'Garden View', icon: '🌿' },
      { name: 'Coffee Machine', icon: '☕' },
      { name: 'Bathrobes & Slippers', icon: '👘' },
      { name: 'Express Check-out', icon: '⚡' },
    ],
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop&crop=center',
    ],
  },
  {
    id: 3,
    name: 'Executive Suite',
    description: 'Luxury suite with separate living area and panoramic view',
    fullDescription:
      'Experience the pinnacle of luxury in our Executive Suite. This expansive accommodation features a separate living room, dining area, and bedroom with panoramic city views. Enjoy exclusive privileges including butler service, complimentary airport transfer, and access to our private executive floor.',
    price: 200,
    size: '65 sqm',
    occupancy: 'Up to 3 adults + 2 children',
    bedType: 'King bed + Sofa bed',
    view: 'Panoramic city view',
    features: ['Butler Service', 'Airport Transfer', 'Private Executive Floor'],
    amenities: [
      { name: 'Butler Service', icon: '🤵' },
      { name: 'Airport Transfer', icon: '🚗' },
      { name: 'Executive Floor', icon: '🏢' },
      { name: 'Separate Living Room', icon: '🛋️' },
      { name: 'Dining Area', icon: '🍽️' },
      { name: 'Premium Bar', icon: '🍾' },
      { name: 'Panoramic View', icon: '🌆' },
      { name: 'Concierge Service', icon: '🎩' },
    ],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop&crop=center',
    ],
  },
])

const filteredRooms = computed(() => {
  return rooms.value.filter((room) => {
    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map((p) => p.replace('+', ''))
      if (max) {
        if (room.price < parseInt(min) || room.price > parseInt(max)) return false
      } else {
        if (room.price < parseInt(min)) return false
      }
    }

    return true
  })
})

const previousImage = (roomId) => {
  if (!currentImageIndex[roomId]) currentImageIndex[roomId] = 0
  if (currentImageIndex[roomId] > 0) {
    currentImageIndex[roomId]--
  }
}

const nextImage = (roomId) => {
  const room = rooms.value.find((r) => r.id === roomId)
  if (!currentImageIndex[roomId]) currentImageIndex[roomId] = 0
  if (currentImageIndex[roomId] < room.images.length - 1) {
    currentImageIndex[roomId]++
  }
}

const applyFilters = () => {
  showToast({
    type: 'info',
    title: 'Filters Applied',
    message: `Found ${filteredRooms.value.length} rooms matching your criteria`,
    duration: 3000,
  })
}

const viewRoomDetails = (room) => {
  selectedRoom.value = room
  modalImageIndex.value = 0
}

const closeRoomDetails = () => {
  selectedRoom.value = null
  modalImageIndex.value = 0
}

const bookRoom = (room) => {
  selectedRoom.value = null
  showBookingForm.value = true
  // Store selected room data if needed
  console.log('Booking room:', room)
}

const handleBookingSubmitted = (bookingData) => {
  console.log('Booking submitted:', bookingData)
}
</script>

<style scoped>
.rooms-page {
  padding: 40px 20px;
  background: #f8f9fa;
  min-height: 100vh;
}

.hero-section {
  text-align: center;
  margin-bottom: 40px;
}

.hero-section h1 {
  font-size: 2.5rem;
  color: #8b4513;
  margin-bottom: 10px;
  font-weight: 300;
  letter-spacing: 2px;
}

.hero-section p {
  font-size: 1.2rem;
  color: #666;
}

/* Filters Section */
.filters-section {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

.filters-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  color: #333;
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.date-inputs {
  display: flex;
  gap: 10px;
}

.filter-group input,
.filter-group select {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.filter-group input:focus,
.filter-group select:focus {
  outline: none;
  border-color: #8b4513;
  box-shadow: 0 0 0 2px rgba(139, 69, 19, 0.1);
}

.search-btn {
  background: #8b4513;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  height: fit-content;
}

.search-btn:hover {
  background: #6b3410;
  transform: translateY(-2px);
}

.rooms-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 30px;
}

.room-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.room-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.room-gallery {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.room-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.room-card:hover .room-image {
  transform: scale(1.05);
}

.gallery-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.room-gallery:hover .gallery-nav {
  opacity: 1;
}

.nav-btn {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #8b4513;
  transition: all 0.3s ease;
}

.nav-btn:hover:not(:disabled) {
  background: white;
  transform: scale(1.1);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.image-indicators {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: white;
  transform: scale(1.2);
}

.room-info {
  padding: 25px;
}

.room-info h3 {
  font-size: 1.5rem;
  color: #8b4513;
  margin-bottom: 12px;
  font-weight: 600;
}

.room-description {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.room-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.feature {
  background: #f8f9fa;
  color: #8b4513;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid #e9ecef;
}

.room-amenities {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  margin-bottom: 25px;
}

.amenity {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #555;
}

.amenity-icon {
  font-size: 1.1rem;
}

.room-pricing {
  margin-bottom: 25px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.price-info {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 5px;
}

.room-price {
  font-size: 1.8rem;
  font-weight: 700;
  color: #8b4513;
}

.price-unit {
  color: #666;
  font-size: 1rem;
}

.pricing-note {
  color: #999;
  font-size: 0.85rem;
}

.room-actions {
  display: flex;
  gap: 12px;
}

.details-btn,
.book-btn {
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.details-btn {
  background: transparent;
  color: #8b4513;
  border: 2px solid #8b4513;
}

.details-btn:hover {
  background: #8b4513;
  color: white;
}

.book-btn {
  background: #8b4513;
  color: white;
}

.book-btn:hover {
  background: #6b3410;
  transform: translateY(-2px);
}

.no-rooms {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.no-rooms h3 {
  color: #8b4513;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

/* Room Details Modal */
.room-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.room-modal-content {
  background: white;
  border-radius: 15px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.modal-header {
  padding: 25px 25px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  margin-bottom: 25px;
}

.modal-header h2 {
  color: #8b4513;
  font-size: 1.8rem;
  margin: 0;
  font-weight: 600;
}

.close-btn {
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

.modal-gallery {
  position: relative;
  height: 400px;
  margin: 0 25px 25px;
  border-radius: 10px;
  overflow: hidden;
}

.modal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-gallery-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.modal-info {
  padding: 0 25px 25px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 30px;
  align-items: start;
}

.room-details h3 {
  color: #8b4513;
  font-size: 1.3rem;
  margin-bottom: 15px;
  font-weight: 600;
}

.room-details p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 25px;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
}

.detail-item {
  color: #555;
  font-size: 0.95rem;
}

.detail-item strong {
  color: #333;
}

.amenities-full h4 {
  color: #8b4513;
  font-size: 1.1rem;
  margin-bottom: 15px;
  font-weight: 600;
}

.amenities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.price-display {
  text-align: center;
}

.modal-price {
  font-size: 2rem;
  font-weight: 700;
  color: #8b4513;
}

.book-modal-btn {
  background: #8b4513;
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.book-modal-btn:hover {
  background: #6b3410;
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .rooms-page {
    padding: 20px 15px;
  }

  .filters-container {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .date-inputs {
    flex-direction: column;
  }

  .rooms-container {
    grid-template-columns: 1fr;
  }

  .room-amenities {
    grid-template-columns: 1fr 1fr;
  }

  .room-actions {
    flex-direction: column;
  }

  .modal-info {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .amenities-grid {
    grid-template-columns: 1fr 1fr;
  }

  .room-modal {
    padding: 10px;
  }

  .modal-gallery {
    height: 250px;
    margin: 0 15px 20px;
  }

  .modal-info {
    padding: 0 15px 20px;
  }

  .modal-header {
    padding: 20px 15px 0;
  }
}

@media (max-width: 480px) {
  .hero-section h1 {
    font-size: 2rem;
  }

  .room-card {
    margin: 0 10px;
  }

  .room-amenities,
  .amenities-grid {
    grid-template-columns: 1fr;
  }

  .price-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }
}
</style>
