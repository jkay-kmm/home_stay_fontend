<template>
  <div class="gallery-page">
    <div class="hero-section">
      <h1>Gallery</h1>
      <p>Explore the beauty of Sunset Hotel through our photo collection</p>
    </div>

    <div class="gallery-tabs">
      <button
        v-for="category in categories"
        :key="category.id"
        :class="['tab-btn', { active: activeCategory === category.id }]"
        @click="activeCategory = category.id"
      >
        {{ category.name }}
      </button>
    </div>

    <div class="gallery-grid">
      <div
        v-for="image in filteredImages"
        :key="image.id"
        class="gallery-item"
        @click="openLightbox(image)"
      >
        <img :src="image.thumbnail" :alt="image.title" class="gallery-image" />
        <div class="image-overlay">
          <h3>{{ image.title }}</h3>
          <p>{{ image.description }}</p>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div v-if="lightboxImage" class="lightbox-overlay" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <button class="close-btn" @click="closeLightbox">&times;</button>
        <img :src="lightboxImage.full" :alt="lightboxImage.title" class="lightbox-image" />
        <div class="lightbox-info">
          <h3>{{ lightboxImage.title }}</h3>
          <p>{{ lightboxImage.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('all')
const lightboxImage = ref(null)

const categories = [
  { id: 'all', name: 'All' },
  { id: 'rooms', name: 'Rooms' },
  { id: 'facilities', name: 'Facilities' },
  { id: 'restaurant', name: 'Restaurant' },
  { id: 'exterior', name: 'Exterior' },
]

const images = [
  {
    id: 1,
    title: 'Deluxe Room',
    description: 'Comfortable and modern deluxe room',
    category: 'rooms',
    thumbnail:
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=300&h=200&fit=crop&crop=center',
    full: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 2,
    title: 'Hotel Pool',
    description: 'Refreshing outdoor swimming pool',
    category: 'facilities',
    thumbnail:
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=300&h=200&fit=crop&crop=center',
    full: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 3,
    title: 'Restaurant',
    description: 'Fine dining restaurant with city views',
    category: 'restaurant',
    thumbnail:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop&crop=center',
    full: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 4,
    title: 'Hotel Exterior',
    description: 'Beautiful hotel facade at sunset',
    category: 'exterior',
    thumbnail:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop&crop=center',
    full: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 5,
    title: 'Suite Bedroom',
    description: 'Luxurious suite with king-size bed',
    category: 'rooms',
    thumbnail:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=300&h=200&fit=crop&crop=center',
    full: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 6,
    title: 'Spa Center',
    description: 'Relaxing spa and wellness center',
    category: 'facilities',
    thumbnail:
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=300&h=200&fit=crop&crop=center',
    full: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop&crop=center',
  },
]

const filteredImages = computed(() => {
  if (activeCategory.value === 'all') {
    return images
  }
  return images.filter((image) => image.category === activeCategory.value)
})

const openLightbox = (image) => {
  lightboxImage.value = image
}

const closeLightbox = () => {
  lightboxImage.value = null
}
</script>

<style scoped>
.gallery-page {
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

.gallery-tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.tab-btn {
  background: transparent;
  border: 2px solid #8b4513;
  color: #8b4513;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tab-btn.active,
.tab-btn:hover {
  background: #8b4513;
  color: white;
}

.gallery-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.gallery-item {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: scale(1.05);
}

.gallery-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: filter 0.3s ease;
}

.gallery-item:hover .gallery-image {
  filter: brightness(0.7);
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 20px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.gallery-item:hover .image-overlay {
  transform: translateY(0);
}

.image-overlay h3 {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.image-overlay p {
  font-size: 0.9rem;
  opacity: 0.9;
}

/* Lightbox */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: white;
  border-radius: 10px;
  overflow: hidden;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  z-index: 1001;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-image {
  width: 100%;
  max-height: 70vh;
  object-fit: contain;
}

.lightbox-info {
  padding: 20px;
  text-align: center;
}

.lightbox-info h3 {
  color: #8b4513;
  margin-bottom: 10px;
}

.lightbox-info p {
  color: #666;
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
  }

  .gallery-tabs {
    gap: 5px;
  }

  .tab-btn {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
}
</style>
