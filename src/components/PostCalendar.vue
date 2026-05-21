<template>
  <div class="calendar-card">
    <div class="calendar-header">
      <button class="month-nav" @click="prevMonth" aria-label="上个月">&lsaquo;</button>
      <span class="month-label">{{ year }} 年 {{ month }} 月</span>
      <button class="month-nav" @click="nextMonth" aria-label="下个月">&rsaquo;</button>
    </div>

    <div class="calendar-grid">
      <div class="weekday-header">
        <span v-for="d in weekdays" :key="d" class="weekday">{{ d }}</span>
      </div>
      <div class="date-grid">
        <div
          v-for="(cell, idx) in cells"
          :key="idx"
          class="date-cell"
          :class="{
            'other-month': !cell.currentMonth,
            'has-post': cell.post,
            'is-today': cell.isToday
          }"
        >
          <router-link
            v-if="cell.post"
            :to="'/posts/' + cell.post.slug"
            class="date-link"
          >
            <span class="date-num">{{ cell.day }}</span>
            <span class="date-dot"></span>
          </router-link>
          <span v-else class="date-num">{{ cell.day }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePosts } from '../composables/usePosts.js'

const weekdays = ['日', '一', '二', '三', '四', '五', '六']

const { posts, loadAllPosts } = usePosts()

const today = new Date()
const currentYear = ref(today.getFullYear())
const currentMonth = ref(today.getMonth() + 1)

const year = computed(() => currentYear.value)
const month = computed(() => currentMonth.value)

const postMap = computed(() => {
  const map = new Map()
  for (const p of posts.value) {
    if (p.date) map.set(p.date, p)
  }
  return map
})

const cells = computed(() => {
  const y = year.value
  const m = month.value

  const firstDay = new Date(y, m - 1, 1).getDay()
  const daysInMonth = new Date(y, m, 0).getDate()
  const daysInPrev = new Date(y, m - 1, 0).getDate()

  const result = []

  for (let i = firstDay - 1; i >= 0; i--) {
    result.push({
      day: daysInPrev - i,
      currentMonth: false,
      post: null,
      isToday: false
    })
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    result.push({
      day: d,
      currentMonth: true,
      post: postMap.value.get(dateStr) || null,
      isToday: y === today.getFullYear() && m === today.getMonth() + 1 && d === today.getDate()
    })
  }

  const remaining = 42 - result.length
  for (let d = 1; d <= remaining; d++) {
    result.push({
      day: d,
      currentMonth: false,
      post: null,
      isToday: false
    })
  }

  return result.slice(0, 42)
})

function prevMonth() {
  if (currentMonth.value === 1) {
    currentYear.value--
    currentMonth.value = 12
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 12) {
    currentYear.value++
    currentMonth.value = 1
  } else {
    currentMonth.value++
  }
}

onMounted(() => {
  loadAllPosts()
})
</script>

<style scoped>
.calendar-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  border: 1px solid var(--color-border-light);
  max-width: 420px;
  margin: 0 auto;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
}

.month-label {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: 0.04em;
}

.month-nav {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--color-border-light);
  background: transparent;
  cursor: pointer;
  font-size: 1.1rem;
  color: var(--color-text-light);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  font-family: var(--font-serif);
}

.month-nav:hover {
  background: var(--color-bg-warm);
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.weekday-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: var(--spacing-sm);
}

.weekday {
  text-align: center;
  font-family: var(--font-sans);
  font-size: 0.72rem;
  color: var(--color-text-lighter);
  padding: var(--spacing-xs) 0;
  letter-spacing: 0.04em;
}

.date-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 3px;
}

.date-cell {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  position: relative;
}

.date-num {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--color-text);
}

.other-month .date-num {
  color: var(--color-border);
}

.is-today {
  background: rgba(191, 94, 43, 0.07);
}

.is-today .date-num {
  color: var(--color-accent);
  font-weight: 600;
}

.has-post .date-num {
  font-weight: 600;
}

.date-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: var(--radius-sm);
  transition: background 0.2s;
  text-decoration: none;
}

.date-link:hover {
  background: rgba(90, 122, 74, 0.08);
}

.date-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-accent);
  margin-top: 2px;
}

@media (max-width: 480px) {
  .calendar-card {
    max-width: 100%;
    padding: var(--spacing-lg);
  }

  .date-num {
    font-size: 0.78rem;
  }
}
</style>
