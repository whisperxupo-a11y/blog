<template>
  <div class="home-page">
    <section class="page-hero">
      <h1 class="hero-title">文章</h1>
      <p class="hero-subtitle">记录思考与技术笔记</p>
      <div class="hero-line"></div>
    </section>

    <section class="section-block section-block--warm">
      <div class="container-wide">
        <Carousel :slides="carouselSlides" />
      </div>
    </section>

    <section class="section-block">
      <div v-if="loading" class="empty-state">
        <span class="loading-pulse">~</span>
        <p>正在翻阅...</p>
      </div>
      <div v-else-if="posts.length === 0" class="empty-state">
        <p>还没有文章</p>
      </div>
      <div v-else class="post-grid">
        <PostCard
          v-for="(post, idx) in posts"
          :key="post.slug"
          :title="post.title"
          :date="post.date"
          :summary="post.summary"
          :slug="post.slug"
          :style="{ animationDelay: idx * 0.1 + 's' }"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePosts } from '../composables/usePosts.js'
import PostCard from '../components/PostCard.vue'
import Carousel from '../components/Carousel.vue'

const carouselSlides = [
  {
    image: 'https://picsum.photos/seed/forest-light/1200/675',
    title: '自然之光',
    description: '光影穿过林间，为文字注入温度'
  },
  {
    image: 'https://picsum.photos/seed/mountain-culture/1200/675',
    title: '山间岁月',
    description: '每一座山峰都藏着一个未被讲述的故事'
  },
  {
    image: 'https://picsum.photos/seed/warm-reading/1200/675',
    title: '阅读时光',
    description: '在纸页之间，安放思考的片刻'
  }
]

const { posts, loading, loadAllPosts } = usePosts()

onMounted(() => {
  loadAllPosts()
})
</script>

<style scoped>
.page-hero {
  padding: var(--spacing-3xl) 0 var(--spacing-2xl);
  text-align: center;
  position: relative;
}

.hero-title {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--color-text);
  position: relative;
  display: inline-block;
}

.hero-title::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: -6px;
  right: -6px;
  height: 7px;
  background: rgba(107, 142, 90, 0.12);
  border-radius: 4px;
  z-index: -1;
}

.hero-subtitle {
  margin-top: var(--spacing-sm);
  color: var(--color-text-light);
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  font-family: var(--font-serif);
  font-style: italic;
}

.hero-line {
  width: 36px;
  height: 3px;
  background: linear-gradient(90deg, var(--color-accent), var(--color-accent-green));
  margin: var(--spacing-lg) auto 0;
  border-radius: 2px;
}

.post-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xlg);
  --spacing-xlg: 1.75rem;
}

.post-grid > * {
  animation: card-enter 0.5s ease-out both;
}

.empty-state {
  padding: var(--spacing-3xl) 0;
  text-align: center;
  color: var(--color-text-lighter);
  font-size: 0.95rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
}

.loading-pulse {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  color: var(--color-accent);
  animation: pulse 1.4s ease-in-out infinite;
}

@keyframes card-enter {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.6rem;
  }

  .post-grid {
    gap: var(--spacing-md);
  }
}
</style>
