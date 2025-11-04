<template>
  <div class="booking-form-modal" v-if="isVisible" @click="closeModal">
    <div class="booking-form-container" @click.stop>
      <div class="booking-header">
        <h2>Book Your Stay</h2>
        <button class="close-btn" @click="closeModal">&times;</button>
      </div>

      <form @submit.prevent="submitBooking" class="booking-form">
        <!-- Guest Information -->
        <div class="form-section">
          <h3>Guest Information</h3>
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name *</label>
              <input type="text" id="firstName" v-model="bookingForm.firstName" required />
            </div>
            <div class="form-group">
              <label for="lastName">Last Name *</label>
              <input type="text" id="lastName" v-model="bookingForm.lastName" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="email">Email *</label>
              <input type="email" id="email" v-model="bookingForm.email" required />
            </div>
            <div class="form-group">
              <label for="phone">Phone Number *</label>
              <input type="tel" id="phone" v-model="bookingForm.phone" required />
            </div>
          </div>
        </div>

        <!-- Stay Details -->
        <div class="form-section">
          <h3>Stay Details</h3>
          <div class="form-row">
            <div class="form-group">
              <label for="checkIn">Check-in Date *</label>
              <input type="date" id="checkIn" v-model="bookingForm.checkIn" :min="today" required />
            </div>
            <div class="form-group">
              <label for="checkOut">Check-out Date *</label>
              <input
                type="date"
                id="checkOut"
                v-model="bookingForm.checkOut"
                :min="bookingForm.checkIn || today"
                required
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="adults">Adults</label>
              <select id="adults" v-model="bookingForm.adults">
                <option v-for="n in 8" :key="n" :value="n">{{ n }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="children">Children</label>
              <select id="children" v-model="bookingForm.children">
                <option v-for="n in 6" :key="n" :value="n">{{ n }}</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="roomType">Room Type *</label>
            <select id="roomType" v-model="bookingForm.roomType" required>
              <option value="">Select Room Type</option>
              <option value="deluxe">Deluxe Room - $120/night</option>
              <option value="superior">Superior Room - $150/night</option>
              <option value="suite">Executive Suite - $200/night</option>
            </select>
          </div>
        </div>

        <!-- Special Requests -->
        <div class="form-section">
          <h3>Special Requests</h3>
          <div class="form-group">
            <label for="specialRequests">Special Requests</label>
            <textarea
              id="specialRequests"
              v-model="bookingForm.specialRequests"
              placeholder="Any special requests or requirements..."
              rows="3"
            ></textarea>
          </div>
        </div>

        <!-- Booking Summary -->
        <div class="booking-summary" v-if="bookingForm.checkIn && bookingForm.checkOut">
          <h3>Booking Summary</h3>
          <div class="summary-item">
            <span>Number of nights:</span>
            <span>{{ numberOfNights }}</span>
          </div>
          <div class="summary-item">
            <span>Room rate per night:</span>
            <span>${{ roomPrice }}</span>
          </div>
          <div class="summary-item total">
            <span>Total Amount:</span>
            <span>${{ totalAmount }}</span>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="cancel-btn" @click="closeModal">Cancel</button>
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? 'Processing...' : 'Book Now' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useToast } from '@/composables/useToast.js'

defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'booking-submitted'])

const { showToast } = useToast()
const isSubmitting = ref(false)

const today = new Date().toISOString().split('T')[0]

const bookingForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  checkIn: '',
  checkOut: '',
  adults: 2,
  children: 0,
  roomType: '',
  specialRequests: '',
})

const roomPrices = {
  deluxe: 120,
  superior: 150,
  suite: 200,
}

const roomPrice = computed(() => {
  return roomPrices[bookingForm.roomType] || 0
})

const numberOfNights = computed(() => {
  if (bookingForm.checkIn && bookingForm.checkOut) {
    const checkIn = new Date(bookingForm.checkIn)
    const checkOut = new Date(bookingForm.checkOut)
    const diffTime = Math.abs(checkOut - checkIn)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }
  return 0
})

const totalAmount = computed(() => {
  return numberOfNights.value * roomPrice.value
})

const closeModal = () => {
  emit('close')
}

const submitBooking = async () => {
  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    showToast({
      type: 'success',
      title: 'Booking Confirmed!',
      message: `Your booking for ${numberOfNights.value} nights has been confirmed. Total: $${totalAmount.value}`,
      duration: 6000,
    })

    emit('booking-submitted', { ...bookingForm, totalAmount: totalAmount.value })

    // Reset form
    Object.assign(bookingForm, {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      adults: 2,
      children: 0,
      roomType: '',
      specialRequests: '',
    })

    closeModal()
  } catch {
    showToast({
      type: 'error',
      title: 'Booking Failed',
      message: 'Unable to process your booking. Please try again.',
      duration: 5000,
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.booking-form-modal {
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

.booking-form-container {
  background: white;
  border-radius: 15px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.booking-header {
  padding: 30px 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  margin-bottom: 30px;
}

.booking-header h2 {
  color: #8b4513;
  font-size: 1.8rem;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #333;
}

.booking-form {
  padding: 0 30px 30px;
}

.form-section {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.form-section:last-of-type {
  border-bottom: none;
}

.form-section h3 {
  color: #8b4513;
  font-size: 1.2rem;
  margin-bottom: 20px;
  font-weight: 600;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  color: #333;
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #8b4513;
  box-shadow: 0 0 0 2px rgba(139, 69, 19, 0.1);
}

.booking-summary {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.booking-summary h3 {
  color: #8b4513;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 5px 0;
}

.summary-item.total {
  border-top: 1px solid #ddd;
  padding-top: 15px;
  margin-top: 15px;
  font-weight: 600;
  font-size: 1.1rem;
  color: #8b4513;
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
}

.cancel-btn,
.submit-btn {
  padding: 12px 30px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn {
  background: #6c757d;
  color: white;
}

.cancel-btn:hover {
  background: #5a6268;
}

.submit-btn {
  background: #8b4513;
  color: white;
}

.submit-btn:hover:not(:disabled) {
  background: #6b3410;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .booking-form-modal {
    padding: 10px;
  }

  .booking-header {
    padding: 20px 20px 0;
  }

  .booking-form {
    padding: 0 20px 20px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .form-actions {
    flex-direction: column;
  }

  .cancel-btn,
  .submit-btn {
    width: 100%;
  }
}
</style>
