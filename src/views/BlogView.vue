<template>
  <div class="blog-page">
    <div class="hero-section">
      <h1>Our Blog</h1>
      <p>Stories, tips and insights about travel and hospitality</p>
    </div>

    <div class="blog-container">
      <article class="blog-post">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop&crop=center"
          alt="Blog post"
          class="post-image"
        />
        <div class="post-content">
          <div class="post-meta">
            <span class="post-date">October 25, 2025</span>
            <span class="post-category">Travel Tips</span>
          </div>
          <h2>Top 10 Things to Do in Hanoi</h2>
          <p>
            Discover the best attractions, food, and experiences in Vietnam's capital city. From
            ancient temples to bustling markets...
          </p>
          <a href="#" class="read-more">Read More</a>
        </div>
      </article>

      <article class="blog-post">
        <img
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop&crop=center"
          alt="Blog post"
          class="post-image"
        />
        <div class="post-content">
          <div class="post-meta">
            <span class="post-date">October 20, 2025</span>
            <span class="post-category">Hotel News</span>
          </div>
          <h2>New Spa Facilities Opening Soon</h2>
          <p>
            We're excited to announce the opening of our new wellness center featuring traditional
            Vietnamese treatments...
          </p>
          <a href="#" class="read-more">Read More</a>
        </div>
      </article>

      <article class="blog-post">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop&crop=center"
          alt="Blog post"
          class="post-image"
        />
        <div class="post-content">
          <div class="post-meta">
            <span class="post-date">October 15, 2025</span>
            <span class="post-category">Local Culture</span>
          </div>
          <h2>Vietnamese Cuisine: A Culinary Journey</h2>
          <p>
            Explore the rich flavors and traditions of Vietnamese food culture, from street food to
            fine dining...
          </p>
          <a href="#" class="read-more">Read More</a>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
// Blog functionality will be added here
</script>

<style scoped>
.blog-page {
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

.blog-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.blog-post {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.blog-post:hover {
  transform: translateY(-3px);
}

.post-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.post-content {
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.post-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.post-date,
.post-category {
  font-size: 0.9rem;
  color: #8b4513;
  font-weight: 500;
}

.post-content h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 15px;
  line-height: 1.4;
}

.post-content p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
}

.read-more {
  color: #8b4513;
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  transition: color 0.3s ease;
}

.read-more:hover {
  color: #6b3410;
}

.read-more::after {
  content: ' →';
  margin-left: 5px;
}

@media (max-width: 768px) {
  .blog-post {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .post-content {
    padding: 20px;
  }
}
</style>
