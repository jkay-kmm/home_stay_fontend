<template>
  <footer class="site-footer">
    <!-- Contact Us Section with Map -->
    <div class="contact-section">
      <div class="contact-container">
        <div class="contact-header">
          <h2>CONTACT US</h2>
        </div>

        <div class="contact-content">
          <!-- Left Side - Contact Info -->
          <div class="contact-info">
            <div class="contact-item">
              <div class="contact-icon">📍</div>
              <div class="contact-details">
                <h4>ADDRESS</h4>
                <p>No 167 Mai Dich, Cau Giay, Hanoi</p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">📞</div>
              <div class="contact-details">
                <h4>TEL</h4>
                <p>0242 2420 777</p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">✉️</div>
              <div class="contact-details">
                <h4>E-MAIL</h4>
                <p>info@webhotel.vn</p>
              </div>
            </div>
          </div>

          <!-- Right Side - Interactive Map -->
          <div class="map-section">
            <div class="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8639810914293!2d105.7936!3d21.0354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDAyJzA3LjQiTiAxMDXCsDQ3JzM3LjAiRQ!5e0!3m2!1sen!2s!4v1635789012345!5m2!1sen!2s"
                width="100%"
                height="300"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Sunset Hotel Location"
              ></iframe>
            </div>
          </div>
        </div>

        <!-- Contact Form Section -->
        <div class="contact-form-section">
          <div class="form-content">
            <div class="form-text">
              <h3>GET IN TOUCH</h3>
              <h2>If you have any questions don't hesitate to contact us.</h2>
            </div>

            <div class="contact-form">
              <form @submit.prevent="submitContactForm">
                <div class="form-row">
                  <input
                    type="email"
                    v-model="contactForm.email"
                    placeholder="Enter your email address *"
                    class="form-input"
                    required
                  />
                  <input
                    type="text"
                    v-model="contactForm.name"
                    placeholder="Enter your name *"
                    class="form-input"
                    required
                  />
                </div>
                <textarea
                  v-model="contactForm.message"
                  placeholder="Enter your message *"
                  class="form-textarea"
                  rows="4"
                  required
                ></textarea>
                <p class="form-note">* All fields are mandatory</p>
                <button type="submit" class="send-btn" :disabled="isSubmittingContact">
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-content">
      <div class="footer-container">
        <!-- Left Section - Links -->
        <div class="footer-section">
          <ul class="footer-links">
            <li><a href="/conditions" class="footer-link">CONDITIONS & TERMS</a></li>
            <li><a href="/privacy" class="footer-link">PRIVACY POLICY</a></li>
            <li><a href="/location" class="footer-link">LOCATION & MAP</a></li>
          </ul>
        </div>

        <!-- Center Section - Logo & Social -->
        <div class="footer-center">
          <div class="footer-logo">
            <h2 class="hotel-name">Sunset Hotel</h2>
            <span class="hotel-subtitle">GRAND</span>
          </div>
          <div class="social-icons">
            <a href="#" class="social-icon twitter" aria-label="Twitter">
              <i class="icon">🐦</i>
            </a>
            <a href="#" class="social-icon facebook" aria-label="Facebook">
              <i class="icon">📘</i>
            </a>
            <a href="#" class="social-icon instagram" aria-label="Instagram">
              <i class="icon">📷</i>
            </a>
          </div>
        </div>

        <!-- Right Section - Newsletter -->
        <div class="footer-section newsletter">
          <h3 class="newsletter-title">NEWSLETTER</h3>
          <p class="newsletter-desc">
            Subscribe to our email newsletter to receive updates and news.
          </p>
          <form class="newsletter-form" @submit.prevent="subscribeNewsletter">
            <div class="input-group">
              <input
                type="email"
                v-model="email"
                placeholder="Enter your email"
                class="newsletter-input"
                required
              />
              <button type="submit" class="newsletter-btn" :disabled="isSubscribing">✈️</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Copyright Bar -->
    <div class="footer-bottom">
      <div class="copyright">
        <p>Copyright © webhotel.vn All Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useToast } from '@/composables/useToast.js'

const { showToast } = useToast()
const email = ref('')
const isSubscribing = ref(false)
const isSubmittingContact = ref(false)

const contactForm = reactive({
  email: '',
  name: '',
  message: '',
})

const subscribeNewsletter = async () => {
  if (!email.value) return

  isSubscribing.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    showToast({
      type: 'success',
      title: 'Subscribed!',
      message: 'Thank you for subscribing to our newsletter.',
      duration: 5000,
    })

    email.value = ''
  } catch {
    showToast({
      type: 'error',
      title: 'Error',
      message: 'Failed to subscribe. Please try again.',
      duration: 5000,
    })
  } finally {
    isSubscribing.value = false
  }
}

const submitContactForm = async () => {
  if (!contactForm.email || !contactForm.name || !contactForm.message) return

  isSubmittingContact.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    showToast({
      type: 'success',
      title: 'Message Sent!',
      message: 'Thank you for contacting us. We will get back to you soon.',
      duration: 5000,
    })

    // Reset form
    contactForm.email = ''
    contactForm.name = ''
    contactForm.message = ''
  } catch {
    showToast({
      type: 'error',
      title: 'Error',
      message: 'Failed to send message. Please try again.',
      duration: 5000,
    })
  } finally {
    isSubmittingContact.value = false
  }
}
</script>

<style scoped>
/* Contact Section */
.contact-section {
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  padding: 80px 20px;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
}

.contact-header {
  text-align: center;
  margin-bottom: 60px;
}

.contact-header h2 {
  font-size: 2.5rem;
  color: #d4a574;
  letter-spacing: 3px;
  font-weight: 300;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 60px;
  margin-bottom: 80px;
}

/* Contact Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.contact-icon {
  font-size: 2rem;
  color: #d4a574;
  min-width: 50px;
}

.contact-details h4 {
  color: #8b4513;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
  letter-spacing: 1px;
}

.contact-details p {
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

/* Interactive Map */
.map-section {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.map-container {
  position: relative;
  width: 100%;
  height: 300px;
}

.map-container iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* Contact Form Section */
.contact-form-section {
  background: white;
  border-radius: 15px;
  padding: 60px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.form-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 60px;
  align-items: start;
}

.form-text h3 {
  color: #d4a574;
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.form-text h2 {
  color: #d4a574;
  font-size: 2.2rem;
  font-weight: 300;
  line-height: 1.4;
  margin: 0;
}

.contact-form {
  width: 100%;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 0;
  font-size: 1rem;
  background: #f9f9f9;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #d4a574;
  background: white;
  box-shadow: 0 0 0 2px rgba(212, 165, 116, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
  margin-bottom: 15px;
}

.form-note {
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 30px;
}

.send-btn {
  background: #d4a574;
  color: white;
  border: none;
  padding: 15px 40px;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.send-btn:hover:not(:disabled) {
  background: #c19660;
  transform: translateY(-2px);
}

.send-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.site-footer {
  background: #2c3e50;
  color: #ecf0f1;
  margin-top: auto;
}

.footer-content {
  padding: 60px 20px 40px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 60px;
  align-items: start;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.footer-link {
  color: #bdc3c7;
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 1px;
  transition: color 0.3s ease;
  text-transform: uppercase;
}

.footer-link:hover {
  color: #f39c12;
}

/* Center Section */
.footer-center {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.footer-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hotel-name {
  font-family: 'Georgia', serif;
  font-size: 28px;
  font-weight: 400;
  color: #f39c12;
  margin: 0;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.hotel-subtitle {
  font-family: 'Georgia', serif;
  font-size: 16px;
  color: #bdc3c7;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-top: 5px;
}

.social-icons {
  display: flex;
  gap: 20px;
  align-items: center;
}

.social-icon {
  width: 40px;
  height: 40px;
  border: 1px solid #34495e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bdc3c7;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 16px;
}

.social-icon:hover {
  border-color: #f39c12;
  color: #f39c12;
  transform: translateY(-2px);
}

/* Newsletter Section */
.newsletter {
  text-align: right;
}

.newsletter-title {
  font-size: 16px;
  font-weight: 500;
  color: #ecf0f1;
  margin-bottom: 15px;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.newsletter-desc {
  font-size: 14px;
  color: #bdc3c7;
  line-height: 1.6;
  margin-bottom: 25px;
  max-width: 280px;
  margin-left: auto;
}

.newsletter-form {
  max-width: 280px;
  margin-left: auto;
}

.input-group {
  display: flex;
  border: 1px solid #34495e;
  border-radius: 0;
  overflow: hidden;
  background: #34495e;
}

.newsletter-input {
  flex: 1;
  padding: 12px 15px;
  border: none;
  background: transparent;
  color: #ecf0f1;
  font-size: 14px;
  outline: none;
}

.newsletter-input::placeholder {
  color: #7f8c8d;
}

.newsletter-btn {
  background: #f39c12;
  border: none;
  padding: 12px 15px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.newsletter-btn:hover:not(:disabled) {
  background: #e67e22;
}

.newsletter-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Footer Bottom */
.footer-bottom {
  border-top: 1px solid #34495e;
  padding: 20px;
  text-align: center;
}

.copyright p {
  margin: 0;
  font-size: 14px;
  color: #7f8c8d;
  letter-spacing: 1px;
}

/* Responsive Design */
@media (max-width: 968px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }

  .footer-section {
    align-items: center;
  }

  .newsletter {
    text-align: center;
  }

  .newsletter-desc,
  .newsletter-form {
    margin-left: 0;
    margin-right: 0;
  }

  .footer-links {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
}

@media (max-width: 640px) {
  .footer-content {
    padding: 40px 20px 30px;
  }

  .footer-container {
    gap: 30px;
  }

  .hotel-name {
    font-size: 24px;
    letter-spacing: 2px;
  }

  .hotel-subtitle {
    font-size: 14px;
    letter-spacing: 3px;
  }

  .footer-links {
    flex-direction: column;
    gap: 12px;
  }

  .social-icons {
    gap: 15px;
  }

  .social-icon {
    width: 35px;
    height: 35px;
    font-size: 14px;
  }

  .newsletter-desc {
    max-width: 100%;
  }
}

/* Contact Section Responsive */
@media (max-width: 968px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .form-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }

  .contact-form-section {
    padding: 40px 30px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .contact-header h2 {
    font-size: 2rem;
  }

  .form-text h2 {
    font-size: 1.8rem;
  }
}

@media (max-width: 640px) {
  .contact-section {
    padding: 60px 15px;
  }

  .contact-form-section {
    padding: 30px 20px;
  }

  .contact-header h2 {
    font-size: 1.8rem;
    letter-spacing: 2px;
  }

  .form-text h2 {
    font-size: 1.5rem;
  }

  .contact-item {
    gap: 15px;
  }

  .contact-icon {
    font-size: 1.5rem;
    min-width: 40px;
  }

  .map-container {
    height: 250px;
  }

  .send-btn {
    width: 100%;
    padding: 12px 30px;
  }
}
</style>
