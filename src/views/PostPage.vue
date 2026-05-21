<template>
  <div class="post-page">
    <div v-if="!post" class="empty-state">
      <span class="empty-icon">~</span>
      <p>文章未找到</p>
      <router-link to="/" class="back-link">&larr; 返回首页</router-link>
    </div>

    <template v-else>
      <header class="post-header-card">
        <div class="header-ornament"></div>
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-meta">
          <time v-if="post.date" class="post-date">{{ formattedDate }}</time>
          <span v-if="post.tags.length" class="post-tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </span>
        </div>
      </header>

      <div class="content-section">
        <PostContent :content="post.content" />
      </div>

      <footer class="post-footer-card">
        <div class="footer-ornament">
          <span class="ornament-icon">~</span>
        </div>
        <router-link to="/" class="back-home">
          <span class="back-arrow">&larr;</span>
          返回文章列表
        </router-link>
      </footer>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePosts } from '../composables/usePosts.js'
import PostContent from '../components/PostContent.vue'

const route = useRoute()
const { loadAllPosts, getPost } = usePosts()

loadAllPosts()
const post = computed(() => getPost(route.params.slug))

const formattedDate = computed(() => {
  if (!post.value?.date) return ''
  const d = new Date(post.value.date)
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`
})
</script>

<style scoped>
.post-page {
  padding: var(--spacing-3xl) 0 var(--spacing-4xl);
  animation: page-enter 0.5s ease-out;
}

.post-header-card {
  text-align: center;
  padding: var(--spacing-2xl);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  border: 1px solid var(--color-border-light);
}

.header-ornament {
  width: 44px;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--color-accent-green), var(--color-accent), transparent);
  border-radius: 2px;
  margin: 0 auto var(--spacing-lg);
  opacity: 0.6;
}

.post-title {
  font-family: var(--font-serif);
  font-size: 1.9rem;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.04em;
  color: var(--color-text);
}

.post-meta {
  margin-top: var(--spacing-lg);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.post-date {
  font-size: 0.9rem;
  color: var(--color-text-lighter);
  display: flex;
  align-items: center;
  gap: 6px;
}

.post-date::before {
  content: '';
  display: inline-block;
  width: 5px;
  height: 5px;
  background: var(--color-accent);
  border-radius: var(--radius-organic);
}

.post-tags {
  display: flex;
  gap: var(--spacing-sm);
}

.tag {
  font-size: 0.75rem;
  padding: 0.2em 0.7em;
  background: linear-gradient(135deg, #fdf6ee 0%, #f8f0e3 100%);
  color: var(--color-accent);
  border-radius: 20px;
  letter-spacing: 0.03em;
  border: 1px solid rgba(197, 118, 51, 0.15);
}

.content-section {
  padding-top: var(--spacing-2xl);
}

.post-footer-card {
  margin-top: var(--spacing-3xl);
  padding: var(--spacing-2xl);
  background: var(--color-surface-warm);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-light);
  text-align: center;
}

.footer-ornament {
  margin-bottom: var(--spacing-lg);
}

.ornament-icon {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  color: var(--color-text-lighter);
  animation: icon-sway 3s ease-in-out infinite;
  display: inline-block;
}

.back-home {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 0.95rem;
  color: var(--color-text-light);
  transition: color 0.3s, transform 0.3s;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  box-shadow: var(--shadow-card);
}

.back-arrow {
  transition: transform 0.3s;
}

.back-home:hover {
  color: var(--color-accent);
  transform: translateX(-3px);
}

.back-home:hover .back-arrow {
  transform: translateX(-3px);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-3xl) 0;
  color: var(--color-text-lighter);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
}

.empty-icon {
  font-family: var(--font-serif);
  font-size: 1.8rem;
  color: var(--color-accent);
  opacity: 0.4;
}

.back-link {
  color: var(--color-accent);
  display: inline-block;
  margin-top: var(--spacing-md);
  transition: color 0.2s;
}

.back-link:hover {
  color: var(--color-accent-hover);
}

@keyframes page-enter {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes icon-sway {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(8deg); }
}

@media (max-width: 480px) {
  .post-title {
    font-size: 1.5rem;
  }

  .post-header-card {
    padding: var(--spacing-xl);
  }

  .post-footer-card {
    padding: var(--spacing-xl);
  }
}
</style>
