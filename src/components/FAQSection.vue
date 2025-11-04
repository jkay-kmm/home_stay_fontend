<template>
  <section class="faq-section">
    <div class="container">
      <div class="section-header">
        <h2>Frequently Asked Questions</h2>
        <p>Find answers to common questions about your stay</p>
      </div>

      <div class="faq-categories">
        <button
          v-for="category in categories"
          :key="category.id"
          :class="['category-btn', { active: activeCategory === category.id }]"
          @click="activeCategory = category.id"
        >
          <span class="category-icon">{{ category.icon }}</span>
          {{ category.name }}
        </button>
      </div>

      <div class="faq-content">
        <div class="faq-list">
          <div
            v-for="faq in filteredFAQs"
            :key="faq.id"
            class="faq-item"
            :class="{ active: openFAQ === faq.id }"
          >
            <button class="faq-question" @click="toggleFAQ(faq.id)">
              <span>{{ faq.question }}</span>
              <span class="faq-icon">{{ openFAQ === faq.id ? '−' : '+' }}</span>
            </button>
            <div class="faq-answer" :class="{ open: openFAQ === faq.id }">
              <div class="faq-answer-content">
                <p v-html="faq.answer"></p>
              </div>
            </div>
          </div>
        </div>

        <div class="faq-contact">
          <div class="contact-card">
            <h3>Still have questions?</h3>
            <p>Our team is here to help you 24/7</p>
            <div class="contact-methods">
              <a href="tel:+842422420777" class="contact-method">
                <span class="method-icon">📞</span>
                <div class="method-info">
                  <strong>Call Us</strong>
                  <span>0242 2420 777</span>
                </div>
              </a>

              <a href="mailto:info@webhotel.vn" class="contact-method">
                <span class="method-icon">✉️</span>
                <div class="method-info">
                  <strong>Email Us</strong>
                  <span>info@webhotel.vn</span>
                </div>
              </a>

              <button class="contact-method" @click="openLiveChat">
                <span class="method-icon">💬</span>
                <div class="method-info">
                  <strong>Live Chat</strong>
                  <span>Available 24/7</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from '@/composables/useToast.js'

const { showToast } = useToast()
const activeCategory = ref('general')
const openFAQ = ref(null)

const categories = [
  { id: 'general', name: 'General', icon: '❓' },
  { id: 'booking', name: 'Booking', icon: '📅' },
  { id: 'rooms', name: 'Rooms & Amenities', icon: '🏨' },
  { id: 'services', name: 'Services', icon: '🛎️' },
  { id: 'policies', name: 'Policies', icon: '📋' },
]

const faqs = ref([
  // General
  {
    id: 1,
    category: 'general',
    question: 'What time is check-in and check-out?',
    answer:
      'Check-in is from 3:00 PM and check-out is until 12:00 PM. Early check-in and late check-out may be available upon request and subject to availability.',
  },
  {
    id: 2,
    category: 'general',
    question: 'Do you provide airport transportation?',
    answer:
      'Yes, we offer airport shuttle service for our guests. Please contact us in advance to arrange pickup. Executive Suite guests enjoy complimentary airport transfer.',
  },
  {
    id: 3,
    category: 'general',
    question: 'Is WiFi available throughout the hotel?',
    answer:
      'Yes, complimentary high-speed WiFi is available throughout the hotel including all guest rooms, public areas, and business center.',
  },
  {
    id: 4,
    category: 'general',
    question: 'Do you have parking facilities?',
    answer:
      'Yes, we provide secure parking facilities for our guests. Valet parking service is available 24/7 with additional charges.',
  },

  // Booking
  {
    id: 5,
    category: 'booking',
    question: 'Can I modify or cancel my reservation?',
    answer:
      "Reservations can be modified or cancelled up to 24 hours before arrival without penalty. Cancellations within 24 hours may incur charges equal to one night's stay.",
  },
  {
    id: 6,
    category: 'booking',
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, JCB, American Express), cash, and bank transfers. Payment is required at check-in or can be processed during booking.',
  },
  {
    id: 7,
    category: 'booking',
    question: 'Do you offer group booking discounts?',
    answer:
      'Yes, we offer special rates for group bookings of 10 rooms or more. Please contact our sales team for customized packages and pricing.',
  },
  {
    id: 8,
    category: 'booking',
    question: 'Can I make a reservation without a credit card?',
    answer:
      'While we prefer credit card reservations for guarantee, we can accommodate cash reservations with advance payment. Please contact us directly to arrange.',
  },

  // Rooms & Amenities
  {
    id: 9,
    category: 'rooms',
    question: 'What amenities are included in the rooms?',
    answer:
      'All rooms include air conditioning, flat-screen TV, mini bar, safe box, work desk, and premium toiletries. Higher room categories include additional amenities like coffee machines and bathrobes.',
  },
  {
    id: 10,
    category: 'rooms',
    question: 'Are there connecting rooms available?',
    answer:
      'Yes, we have connecting rooms available for families. Please mention this requirement when making your reservation to ensure availability.',
  },
  {
    id: 11,
    category: 'rooms',
    question: 'Do all rooms have balconies?',
    answer:
      'Deluxe and Superior rooms feature private balconies. Standard rooms have large windows with city or garden views. Executive Suites have spacious balconies with panoramic views.',
  },
  {
    id: 12,
    category: 'rooms',
    question: 'Is room service available 24/7?',
    answer:
      'Room service is available 24 hours a day. Our extensive menu includes international and local cuisine, with special dietary options available upon request.',
  },

  // Services
  {
    id: 13,
    category: 'services',
    question: 'Do you have a fitness center and spa?',
    answer:
      'Yes, our fitness center is open 24/7 with modern equipment. Our spa offers traditional Vietnamese treatments and is open from 9:00 AM to 10:00 PM.',
  },
  {
    id: 14,
    category: 'services',
    question: 'Are there dining options in the hotel?',
    answer:
      'We have multiple dining venues including our main restaurant serving international cuisine, a rooftop bar with city views, and 24-hour room service.',
  },
  {
    id: 15,
    category: 'services',
    question: 'Do you provide laundry and dry cleaning services?',
    answer:
      'Yes, we offer same-day laundry and dry cleaning services. Express service is available for an additional fee.',
  },
  {
    id: 16,
    category: 'services',
    question: 'Is there a business center?',
    answer:
      'Yes, our business center is equipped with computers, printers, and meeting facilities. We also offer secretarial services and translation assistance.',
  },

  // Policies
  {
    id: 17,
    category: 'policies',
    question: 'What is your pet policy?',
    answer:
      'We welcome pets in designated rooms with advance notice. Pet fee applies and pets must be kept on leash in public areas. Service animals are always welcome.',
  },
  {
    id: 18,
    category: 'policies',
    question: 'Is smoking allowed in the hotel?',
    answer:
      'Our hotel is smoke-free. Smoking is only permitted in designated outdoor areas. Violation of this policy may result in cleaning fees.',
  },
  {
    id: 19,
    category: 'policies',
    question: 'What is the minimum age for check-in?',
    answer:
      'Guests must be at least 18 years old to check in. Minors must be accompanied by a parent or guardian, or have written authorization.',
  },
  {
    id: 20,
    category: 'policies',
    question: 'Do you have a dress code for restaurants?',
    answer:
      'Smart casual attire is required for our main restaurant during dinner service. Beachwear and flip-flops are not permitted in dining areas.',
  },
])

const filteredFAQs = computed(() => {
  return faqs.value.filter((faq) => faq.category === activeCategory.value)
})

const toggleFAQ = (faqId) => {
  openFAQ.value = openFAQ.value === faqId ? null : faqId
}

const openLiveChat = () => {
  showToast({
    type: 'info',
    title: 'Live Chat',
    message:
      'Live chat feature will be available soon. Please call or email us for immediate assistance.',
    duration: 5000,
  })
}
</script>

<style scoped>
.faq-section {
  padding: 80px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-header h2 {
  font-size: 2.5rem;
  color: #8b4513;
  margin-bottom: 15px;
  font-weight: 300;
  letter-spacing: 2px;
}

.section-header p {
  color: #666;
  font-size: 1.1rem;
}

.faq-categories {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 50px;
}

.category-btn {
  background: white;
  border: 2px solid #e9ecef;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  color: #666;
  display: flex;
  align-items: center;
  gap: 8px;
}

.category-btn:hover {
  border-color: #8b4513;
  color: #8b4513;
  transform: translateY(-2px);
}

.category-btn.active {
  background: #8b4513;
  border-color: #8b4513;
  color: white;
}

.category-icon {
  font-size: 1.2rem;
}

.faq-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  align-items: start;
}

.faq-list {
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.faq-item {
  border-bottom: 1px solid #f0f0f0;
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-question {
  width: 100%;
  background: none;
  border: none;
  padding: 25px;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  transition: all 0.3s ease;
}

.faq-question:hover {
  background: #f8f9fa;
  color: #8b4513;
}

.faq-item.active .faq-question {
  background: #8b4513;
  color: white;
}

.faq-icon {
  font-size: 1.5rem;
  font-weight: 300;
  transition: transform 0.3s ease;
}

.faq-item.active .faq-icon {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: #f8f9fa;
}

.faq-answer.open {
  max-height: 300px;
}

.faq-answer-content {
  padding: 25px;
  color: #555;
  line-height: 1.6;
}

.faq-answer-content p {
  margin: 0;
}

.faq-contact {
  position: sticky;
  top: 20px;
}

.contact-card {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.contact-card h3 {
  color: #8b4513;
  font-size: 1.3rem;
  margin-bottom: 10px;
  font-weight: 600;
}

.contact-card p {
  color: #666;
  margin-bottom: 25px;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  background: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
}

.contact-method:hover {
  border-color: #8b4513;
  background: #f8f9fa;
  transform: translateY(-2px);
}

.method-icon {
  font-size: 1.5rem;
  width: 40px;
  text-align: center;
}

.method-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.method-info strong {
  color: #333;
  font-weight: 600;
}

.method-info span {
  color: #666;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 968px) {
  .faq-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .faq-contact {
    position: static;
  }
}

@media (max-width: 768px) {
  .faq-section {
    padding: 60px 15px;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .faq-categories {
    flex-direction: column;
    align-items: center;
  }

  .category-btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }

  .faq-question {
    padding: 20px 15px;
    font-size: 1rem;
  }

  .faq-answer-content {
    padding: 20px 15px;
  }

  .contact-card {
    padding: 25px 20px;
  }

  .contact-methods {
    gap: 12px;
  }

  .contact-method {
    padding: 12px;
  }

  .method-icon {
    font-size: 1.3rem;
    width: 35px;
  }
}

@media (max-width: 480px) {
  .section-header h2 {
    font-size: 1.8rem;
    letter-spacing: 1px;
  }

  .faq-question {
    padding: 15px;
    font-size: 0.95rem;
  }

  .faq-answer-content {
    padding: 15px;
    font-size: 0.9rem;
  }

  .contact-card {
    padding: 20px 15px;
  }

  .contact-card h3 {
    font-size: 1.1rem;
  }
}
</style>
