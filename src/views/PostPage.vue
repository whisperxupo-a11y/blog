<template>
  <div class="post-page">
    <div v-if="!post" class="empty-state">
      <span class="empty-icon">~</span>
      <p>文章未找到</p>
      <router-link to="/" class="back-link">&larr; 返回首页</router-link>
    </div>

    <template v-else>
      <header class="post-header">
        <div class="ornament-line ornament-line--accent ornament-line--center"></div>
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

      <footer class="post-footer">
        <div class="footer-rule"></div>
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
  max-width: var(--max-width-content);
  margin: 0 auto;
  padding-left: var(--spacing-xl);
  padding-right: var(--spacing-xl);
  animation: fade-up 0.5s ease-out;
}

/* Header */
.post-header {
  text-align: center;
  padding-bottom: var(--spacing-2xl);
  border-bottom: 1px solid var(--color-border-light);
  margin-bottom: var(--spacing-2xl);
}

.post-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.04em;
  color: var(--color-text);
  margin-top: var(--spacing-md);
}

.post-meta {
  margin-top: var(--spacing-lg);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
}

.post-date {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--color-text-lighter);
  letter-spacing: 0.04em;
}

.post-tags {
  display: flex;
  gap: var(--spacing-sm);
}

.tag {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  padding: 0.2em 0.8em;
  background: var(--color-ink-light);
  color: var(--color-accent);
  border-radius: 20px;
  letter-spacing: 0.04em;
  border: 1px solid rgba(191, 94, 43, 0.1);
}

/* Footer */
.post-footer {
  margin-top: var(--spacing-3xl);
  text-align: center;
}

.footer-rule {
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-accent-green), var(--color-accent));
  opacity: 0.3;
  margin: 0 auto var(--spacing-xl);
  border-radius: 1px;
}

.back-home {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--color-text-light);
  transition: color 0.3s, transform 0.3s;
  letter-spacing: 0.03em;
}

.back-arrow {
  transition: transform 0.3s;
}

.back-home:hover {
  color: var(--color-accent);
  transform: translateX(-4px);
}

.back-home:hover .back-arrow {
  transform: translateX(-4px);
}

/* Empty */
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
  font-family: var(--font-display);
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

@media (max-width: 480px) {
  .post-title {
    font-size: 1.5rem;
  }
}
</style>
