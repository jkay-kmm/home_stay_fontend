<template>
  <section class="reviews-section">
    <div class="container">
      <div class="section-header">
        <h2>What Our Guests Say</h2>
        <p>Real reviews from verified guests</p>
      </div>

      <div class="reviews-grid">
        <div class="review-card" v-for="review in reviews" :key="review.id">
          <div class="review-header">
            <div class="guest-info">
              <img :src="review.avatar" :alt="review.name" class="guest-avatar" />
              <div class="guest-details">
                <h4>{{ review.name }}</h4>
                <span class="guest-location">{{ review.location }}</span>
              </div>
            </div>
            <div class="review-rating">
              <div class="stars">
                <span
                  v-for="star in 5"
                  :key="star"
                  class="star"
                  :class="{ filled: star <= review.rating }"
                  >⭐</span
                >
              </div>
              <span class="rating-number">{{ review.rating }}/5</span>
            </div>
          </div>

          <div class="review-content">
            <p>{{ review.comment }}</p>
          </div>

          <div class="review-footer">
            <span class="review-date">{{ formatDate(review.date) }}</span>
            <span class="verified-badge">✓ Verified Stay</span>
          </div>
        </div>
      </div>

      <!-- Overall Rating Summary -->
      <div class="rating-summary">
        <div class="overall-rating">
          <div class="rating-number">{{ overallRating }}</div>
          <div class="rating-text">
            <div class="stars">
              <span v-for="star in 5" :key="star" class="star filled">⭐</span>
            </div>
            <p>Excellent (Based on {{ reviews.length }} reviews)</p>
          </div>
        </div>

        <div class="rating-breakdown">
          <div class="rating-bar" v-for="rating in ratingBreakdown" :key="rating.stars">
            <span class="rating-label">{{ rating.stars }} stars</span>
            <div class="bar-container">
              <div class="bar-fill" :style="{ width: rating.percentage + '%' }"></div>
            </div>
            <span class="rating-count">{{ rating.count }}</span>
          </div>
        </div>
      </div>

      <!-- Add Review Button -->
      <div class="add-review-section">
        <button class="add-review-btn" @click="showReviewForm = true">Write a Review</button>
      </div>

      <!-- Review Form Modal -->
      <div class="review-modal" v-if="showReviewForm" @click="closeReviewForm">
        <div class="review-form-container" @click.stop>
          <div class="form-header">
            <h3>Write a Review</h3>
            <button class="close-btn" @click="closeReviewForm">&times;</button>
          </div>

          <form @submit.prevent="submitReview" class="review-form">
            <div class="form-group">
              <label for="reviewName">Your Name *</label>
              <input type="text" id="reviewName" v-model="newReview.name" required />
            </div>

            <div class="form-group">
              <label for="reviewEmail">Email *</label>
              <input type="email" id="reviewEmail" v-model="newReview.email" required />
            </div>

            <div class="form-group">
              <label for="reviewLocation">Location</label>
              <input
                type="text"
                id="reviewLocation"
                v-model="newReview.location"
                placeholder="City, Country"
              />
            </div>

            <div class="form-group">
              <label>Rating *</label>
              <div class="rating-input">
                <span
                  v-for="star in 5"
                  :key="star"
                  class="star-input"
                  :class="{ filled: star <= newReview.rating }"
                  @click="newReview.rating = star"
                >
                  ⭐
                </span>
              </div>
            </div>

            <div class="form-group">
              <label for="reviewComment">Your Review *</label>
              <textarea
                id="reviewComment"
                v-model="newReview.comment"
                rows="4"
                placeholder="Share your experience with us..."
                required
              ></textarea>
            </div>

            <div class="form-actions">
              <button type="button" class="cancel-btn" @click="closeReviewForm">Cancel</button>
              <button type="submit" class="submit-btn" :disabled="isSubmittingReview">
                {{ isSubmittingReview ? 'Submitting...' : 'Submit Review' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useToast } from '@/composables/useToast.js'

const { showToast } = useToast()
const showReviewForm = ref(false)
const isSubmittingReview = ref(false)

const newReview = reactive({
  name: '',
  email: '',
  location: '',
  rating: 0,
  comment: '',
})

const reviews = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, USA',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
    rating: 5,
    comment:
      'Amazing stay! The hotel exceeded all expectations. Beautiful rooms, excellent service, and perfect location. Will definitely come back!',
    date: '2025-10-28',
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'Singapore',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    rating: 5,
    comment:
      'Fantastic experience from check-in to check-out. The staff was incredibly helpful and the facilities were top-notch. Highly recommended!',
    date: '2025-10-25',
  },
  {
    id: 3,
    name: 'Emma Williams',
    location: 'London, UK',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    rating: 4,
    comment:
      'Great hotel with excellent location. Room was clean and comfortable. The breakfast was delicious. Minor issue with WiFi but overall very good.',
    date: '2025-10-22',
  },
  {
    id: 4,
    name: 'David Kim',
    location: 'Seoul, Korea',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    rating: 5,
    comment:
      'Perfect for business trip. Professional service, quiet rooms, and great meeting facilities. The concierge was extremely helpful.',
    date: '2025-10-20',
  },
  {
    id: 5,
    name: 'Lisa Rodriguez',
    location: 'Madrid, Spain',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face',
    rating: 4,
    comment:
      'Beautiful hotel with great amenities. Loved the spa and pool area. Room service was quick and food quality excellent.',
    date: '2025-10-18',
  },
  {
    id: 6,
    name: 'James Thompson',
    location: 'Sydney, Australia',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face',
    rating: 5,
    comment:
      'Outstanding service and beautiful rooms. The staff went above and beyond to make our anniversary special. Unforgettable experience!',
    date: '2025-10-15',
  },
])

const overallRating = computed(() => {
  const total = reviews.value.reduce((sum, review) => sum + review.rating, 0)
  return (total / reviews.value.length).toFixed(1)
})

const ratingBreakdown = computed(() => {
  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

  reviews.value.forEach((review) => {
    breakdown[review.rating]++
  })

  return Object.entries(breakdown)
    .reverse()
    .map(([stars, count]) => ({
      stars: parseInt(stars),
      count,
      percentage: (count / reviews.value.length) * 100,
    }))
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const closeReviewForm = () => {
  showReviewForm.value = false
  // Reset form
  Object.assign(newReview, {
    name: '',
    email: '',
    location: '',
    rating: 0,
    comment: '',
  })
}

const submitReview = async () => {
  if (!newReview.rating) {
    showToast({
      type: 'error',
      title: 'Rating Required',
      message: 'Please select a rating before submitting your review.',
      duration: 4000,
    })
    return
  }

  isSubmittingReview.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    showToast({
      type: 'success',
      title: 'Review Submitted!',
      message: 'Thank you for your review. It will be published after moderation.',
      duration: 5000,
    })

    closeReviewForm()
  } catch {
    showToast({
      type: 'error',
      title: 'Submission Failed',
      message: 'Unable to submit your review. Please try again.',
      duration: 4000,
    })
  } finally {
    isSubmittingReview.value = false
  }
}
</script>

<style scoped>
.reviews-section {
  padding: 80px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-header h2 {
  font-size: 2.5rem;
  color: #8b4513;
  margin-bottom: 10px;
  font-weight: 300;
  letter-spacing: 2px;
}

.section-header p {
  color: #666;
  font-size: 1.1rem;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.review-card {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.review-card:hover {
  transform: translateY(-5px);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.guest-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.guest-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.guest-details h4 {
  margin: 0;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
}

.guest-location {
  color: #666;
  font-size: 0.9rem;
}

.review-rating {
  text-align: right;
}

.stars {
  margin-bottom: 5px;
}

.star {
  font-size: 1rem;
  margin-right: 2px;
}

.star.filled {
  color: #ffd700;
}

.rating-number {
  color: #8b4513;
  font-weight: 600;
  font-size: 0.9rem;
}

.review-content p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
  font-style: italic;
}

.review-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.review-date {
  color: #999;
}

.verified-badge {
  color: #28a745;
  font-weight: 500;
}

.rating-summary {
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 40px;
  margin-bottom: 40px;
  align-items: center;
}

.overall-rating {
  display: flex;
  align-items: center;
  gap: 20px;
}

.overall-rating .rating-number {
  font-size: 3rem;
  font-weight: 700;
  color: #8b4513;
}

.rating-text .stars {
  margin-bottom: 8px;
}

.rating-text .stars .star {
  font-size: 1.2rem;
  color: #ffd700;
}

.rating-text p {
  margin: 0;
  color: #666;
  font-weight: 500;
}

.rating-breakdown {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rating-bar {
  display: grid;
  grid-template-columns: 80px 1fr 40px;
  align-items: center;
  gap: 15px;
}

.rating-label {
  color: #666;
  font-size: 0.9rem;
}

.bar-container {
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: #8b4513;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.rating-count {
  color: #666;
  font-size: 0.9rem;
  text-align: center;
}

.add-review-section {
  text-align: center;
}

.add-review-btn {
  background: #8b4513;
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
}

.add-review-btn:hover {
  background: #6b3410;
  transform: translateY(-2px);
}

.review-modal {
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

.review-form-container {
  background: white;
  border-radius: 15px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.form-header {
  padding: 30px 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  margin-bottom: 30px;
}

.form-header h3 {
  color: #8b4513;
  font-size: 1.5rem;
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

.review-form {
  padding: 0 30px 30px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  color: #333;
  font-weight: 500;
  margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #8b4513;
  box-shadow: 0 0 0 2px rgba(139, 69, 19, 0.1);
}

.rating-input {
  display: flex;
  gap: 5px;
}

.star-input {
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  filter: grayscale(100%);
}

.star-input:hover,
.star-input.filled {
  filter: grayscale(0%);
  transform: scale(1.1);
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
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
  .reviews-grid {
    grid-template-columns: 1fr;
  }

  .rating-summary {
    grid-template-columns: 1fr;
    gap: 30px;
    text-align: center;
  }

  .overall-rating {
    justify-content: center;
  }

  .review-modal {
    padding: 10px;
  }

  .form-header {
    padding: 20px 20px 0;
  }

  .review-form {
    padding: 0 20px 20px;
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
