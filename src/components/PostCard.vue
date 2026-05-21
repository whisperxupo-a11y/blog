<template>
  <article class="post-card">
    <router-link :to="'/posts/' + slug" class="card-link">
      <time v-if="date" class="card-date">{{ formattedDate }}</time>
      <h2 class="card-title">{{ title }}</h2>
      <p class="card-summary">{{ summary }}</p>
      <span class="card-arrow">
        阅读 <span class="arrow-icon">&rarr;</span>
      </span>
    </router-link>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  date: String,
  summary: String,
  slug: String
})

const formattedDate = computed(() => {
  if (!props.date) return ''
  const d = new Date(props.date)
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`
})
</script>

<style scoped>
.post-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  border: 1px solid var(--color-border-light);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-hover);
}

.card-link {
  display: block;
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
}

.card-date {
  font-family: var(--font-sans);
  font-size: 0.78rem;
  color: var(--color-text-lighter);
  letter-spacing: 0.06em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-date::before {
  content: '';
  display: inline-block;
  width: 5px;
  height: 5px;
  background: var(--color-accent);
  border-radius: var(--radius-organic);
}

.card-title {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 700;
  margin: var(--spacing-sm) 0;
  color: var(--color-text);
  line-height: 1.4;
  transition: color 0.3s;
}

.post-card:hover .card-title {
  color: var(--color-accent);
}

.card-summary {
  font-size: 0.95rem;
  color: var(--color-text-light);
  line-height: 1.8;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: var(--spacing-md);
}

.card-arrow {
  font-size: 0.85rem;
  color: var(--color-text-lighter);
  transition: color 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.arrow-icon {
  display: inline-block;
  transition: transform 0.35s ease;
}

.post-card:hover .card-arrow {
  color: var(--color-accent);
}

.post-card:hover .arrow-icon {
  transform: translateX(5px);
}
</style>
