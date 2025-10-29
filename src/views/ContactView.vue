<template>
  <div class="contact-page">
    <div class="hero-section">
      <h1>Contact Us</h1>
      <p>Get in touch with us for reservations and inquiries</p>
    </div>

    <div class="contact-container">
      <!-- Contact Information -->
      <div class="contact-info">
        <div class="info-card">
          <div class="info-icon">📍</div>
          <h3>Address</h3>
          <p>No. 167 Mai Dich<br />Cau Giay, Hanoi<br />Vietnam</p>
        </div>

        <div class="info-card">
          <div class="info-icon">📞</div>
          <h3>Phone</h3>
          <p>+84 242 2420 777</p>
          <p>+84 901 234 567</p>
        </div>

        <div class="info-card">
          <div class="info-icon">✉️</div>
          <h3>Email</h3>
          <p>info@sunsethotel.com</p>
          <p>reservations@sunsethotel.com</p>
        </div>

        <div class="info-card">
          <div class="info-icon">🕒</div>
          <h3>Business Hours</h3>
          <p>Check-in: 2:00 PM</p>
          <p>Check-out: 12:00 PM</p>
          <p>Reception: 24/7</p>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="contact-form">
        <h2>Send us a Message</h2>
        <form @submit.prevent="submitForm">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                v-model="form.firstName"
                required
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                v-model="form.lastName"
                required
                class="form-input"
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="form.email" required class="form-input" />
            </div>
            <div class="form-group">
              <label for="phone">Phone</label>
              <input type="tel" id="phone" v-model="form.phone" class="form-input" />
            </div>
          </div>

          <div class="form-group">
            <label for="subject">Subject</label>
            <select id="subject" v-model="form.subject" required class="form-select">
              <option value="">Select a subject</option>
              <option value="reservation">Room Reservation</option>
              <option value="inquiry">General Inquiry</option>
              <option value="complaint">Complaint</option>
              <option value="feedback">Feedback</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea
              id="message"
              v-model="form.message"
              required
              rows="5"
              class="form-textarea"
              placeholder="Please describe your inquiry..."
            ></textarea>
          </div>

          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Map Section -->
    <div class="map-section">
      <h2>Find Us</h2>
      <div class="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8639810914293!2d105.7936!3d21.0354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDAyJzA3LjQiTiAxMDXCsDQ3JzM3LjAiRQ!5e0!3m2!1sen!2s!4v1635789012345!5m2!1sen!2s"
          width="100%"
          height="400"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useToast } from '@/composables/useToast.js'

const { showToast } = useToast()
const isSubmitting = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const submitForm = async () => {
  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Show success message
    showToast({
      type: 'success',
      title: 'Message Sent!',
      message: 'Thank you for contacting us. We will get back to you soon.',
      duration: 5000,
    })

    // Reset form
    Object.keys(form).forEach((key) => {
      form[key] = ''
    })
  } catch {
    showToast({
      type: 'error',
      title: 'Error',
      message: 'Failed to send message. Please try again.',
      duration: 5000,
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact-page {
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

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 60px;
  margin-bottom: 80px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.info-card {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.info-icon {
  font-size: 2rem;
  margin-bottom: 15px;
}

.info-card h3 {
  color: #8b4513;
  font-size: 1.3rem;
  margin-bottom: 10px;
}

.info-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 5px;
}

.contact-form {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.contact-form h2 {
  color: #8b4513;
  margin-bottom: 30px;
  text-align: center;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #8b4513;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  width: 100%;
  background: #8b4513;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  background: #6b3410;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.map-section {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.map-section h2 {
  color: #8b4513;
  font-size: 2rem;
  margin-bottom: 30px;
}

.map-container {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .contact-form {
    padding: 30px 20px;
  }

  .info-card {
    padding: 20px;
  }
}
</style>
