<template>
  <div class="archive-page">
    <header class="archive-header">
      <div class="header-ornament"></div>
      <h1 class="archive-title">归档</h1>
    </header>

    <section class="section-block">
      <PostCalendar />
    </section>

    <section class="section-block">
      <div v-if="loading" class="empty-state">
        <span class="loading-pulse">~</span>
        <p>正在翻阅...</p>
      </div>
      <div v-else class="timeline">
        <div v-for="post in posts" :key="post.slug" class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <time v-if="post.date" class="timeline-date">{{ formatDate(post.date) }}</time>
            <router-link :to="'/posts/' + post.slug" class="timeline-title">
              {{ post.title }}
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePosts } from '../composables/usePosts.js'
import PostCalendar from '../components/PostCalendar.vue'

const { posts, loading, loadAllPosts } = usePosts()

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`
}

onMounted(() => {
  loadAllPosts()
})
</script>

<style scoped>
.archive-page {
  padding: var(--spacing-3xl) 0 var(--spacing-4xl);
}

.archive-header {
  text-align: center;
  padding-bottom: var(--spacing-xl);
}

.header-ornament {
  width: 44px;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--color-accent-green), var(--color-accent), transparent);
  border-radius: 2px;
  margin: 0 auto var(--spacing-md);
  opacity: 0.6;
}

.archive-title {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--color-text);
  position: relative;
  display: inline-block;
}

.archive-title::after {
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

.timeline {
  position: relative;
  padding-left: var(--spacing-xl);
}

.timeline::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 4px;
  bottom: 4px;
  width: 1px;
  background: linear-gradient(180deg, var(--color-border), var(--color-border-light), transparent);
}

.timeline-item {
  position: relative;
  padding: var(--spacing-md) 0 var(--spacing-md) var(--spacing-lg);
  animation: fade-in 0.5s ease-out both;
}

.timeline-dot {
  position: absolute;
  left: calc(-1 * var(--spacing-xl) + 6px);
  top: 50%;
  transform: translate(-50%, -50%);
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--color-surface);
  border: 2px solid var(--color-accent);
  z-index: 1;
}

.timeline-content {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  padding: var(--spacing-md) var(--spacing-lg);
  box-shadow: var(--shadow-card);
  border: 1px solid var(--color-border-light);
  transition: box-shadow 0.3s, transform 0.3s;
}

.timeline-content:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateX(3px);
}

.timeline-date {
  font-size: 0.78rem;
  color: var(--color-text-lighter);
  letter-spacing: 0.04em;
  display: block;
  margin-bottom: 2px;
}

.timeline-title {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  transition: color 0.2s;
}

.timeline-title:hover {
  color: var(--color-accent);
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

@media (max-width: 480px) {
  .timeline {
    padding-left: var(--spacing-lg);
  }

  .timeline-item {
    padding-left: var(--spacing-md);
  }
}
</style>
