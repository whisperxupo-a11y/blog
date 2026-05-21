<template>
  <article class="post-card">
    <router-link :to="'/posts/' + slug" class="card-inner">
      <div class="card-accent"></div>
      <div class="card-body">
        <time v-if="date" class="card-date">{{ formattedDate }}</time>
        <h2 class="card-title">{{ title }}</h2>
        <p class="card-summary">{{ summary }}</p>
        <span class="card-action">
          阅读全文
          <span class="action-arrow">&rarr;</span>
        </span>
      </div>
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
  const y = d.getFullYear()
  const m = d.getMonth() + 1
  const day = d.getDate()
  return `${y} · ${String(m).padStart(2, '0')} · ${String(day).padStart(2, '0')}`
})
</script>

<style scoped>
.post-card {
  position: relative;
}

.card-inner {
  display: flex;
  gap: var(--spacing-lg);
  padding: var(--spacing-xl) var(--spacing-xl) var(--spacing-xl) 0;
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  transition: background 0.35s, transform 0.35s;
  position: relative;
}

/* Left accent bar */
.card-accent {
  flex-shrink: 0;
  width: 3px;
  border-radius: 2px;
  background: var(--color-border);
  transition: background 0.4s, width 0.4s;
}

.card-inner:hover .card-accent {
  background: linear-gradient(180deg, var(--color-accent), var(--color-accent-green));
  width: 4px;
}

.card-body {
  flex: 1;
  min-width: 0;
}

.card-date {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--color-text-lighter);
  letter-spacing: 0.06em;
  margin-bottom: var(--spacing-sm);
  display: block;
}

.card-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
  transition: color 0.3s;
  letter-spacing: 0.03em;
}

.card-inner:hover .card-title {
  color: var(--color-accent);
}

.card-summary {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  color: var(--color-text-light);
  line-height: 1.85;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: var(--spacing-md);
}

.card-action {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-text-lighter);
  letter-spacing: 0.04em;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: color 0.3s;
}

.action-arrow {
  display: inline-block;
  transition: transform 0.35s;
}

.card-inner:hover .card-action {
  color: var(--color-accent);
}

.card-inner:hover .action-arrow {
  transform: translateX(6px);
}

@media (max-width: 480px) {
  .card-inner {
    padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-lg) 0;
  }

  .card-title {
    font-size: 1.2rem;
  }
}
</style>
