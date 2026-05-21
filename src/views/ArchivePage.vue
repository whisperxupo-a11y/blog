<template>
  <div class="archive-page">
    <section class="archive-hero">
      <div class="ornament-line ornament-line--accent ornament-line--center"></div>
      <h1 class="archive-title">归档</h1>
      <p class="archive-sub">按时间线浏览所有文章</p>
    </section>

    <section class="section-block">
      <div class="container">
        <PostCalendar />
      </div>
    </section>

    <section class="section-block">
      <div class="container">
        <div v-if="loading" class="empty-state">
          <span class="loading-icon">~</span>
          <p>正在翻阅...</p>
        </div>
        <div v-else class="timeline">
          <div v-for="post in posts" :key="post.slug" class="timeline-item">
            <div class="timeline-marker">
              <div class="timeline-dot"></div>
            </div>
            <div class="timeline-card">
              <time v-if="post.date" class="timeline-date">{{ formatDate(post.date) }}</time>
              <router-link :to="'/posts/' + post.slug" class="timeline-title">
                {{ post.title }}
              </router-link>
            </div>
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

/* Hero */
.archive-hero {
  text-align: center;
  padding-bottom: var(--spacing-md);
}

.archive-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--color-text);
  margin-top: var(--spacing-md);
}

.archive-sub {
  margin-top: var(--spacing-sm);
  font-family: var(--font-serif);
  font-size: 0.9rem;
  color: var(--color-text-lighter);
  font-style: italic;
}

/* Timeline */
.timeline {
  position: relative;
  padding-left: var(--spacing-2xl);
}

.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 6px;
  bottom: 6px;
  width: 1px;
  background: linear-gradient(180deg, var(--color-accent-green), var(--color-border), transparent);
  opacity: 0.4;
}

.timeline-item {
  position: relative;
  padding: var(--spacing-md) 0 var(--spacing-md) var(--spacing-lg);
  animation: fade-up 0.5s ease-out both;
}

.timeline-marker {
  position: absolute;
  left: calc(-1 * var(--spacing-2xl) + 7px);
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.timeline-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-surface);
  border: 2px solid var(--color-accent);
}

.timeline-card {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  padding: var(--spacing-md) var(--spacing-xl);
  border: 1px solid var(--color-border-light);
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
}

.timeline-card:hover {
  border-color: var(--color-accent);
  transform: translateX(4px);
  box-shadow: var(--shadow-card-hover);
}

.timeline-date {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--color-text-lighter);
  letter-spacing: 0.04em;
  display: block;
  margin-bottom: 3px;
}

.timeline-title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  transition: color 0.2s;
  letter-spacing: 0.02em;
}

.timeline-title:hover {
  color: var(--color-accent);
}

/* Empty */
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

.loading-icon {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-accent);
  animation: sway 1.4s ease-in-out infinite;
  display: inline-block;
}

@keyframes sway {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(6deg); }
}

@media (max-width: 480px) {
  .timeline {
    padding-left: var(--spacing-xl);
  }

  .timeline-item {
    padding-left: var(--spacing-md);
  }
}
</style>
