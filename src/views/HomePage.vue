<template>
  <div class="home-page">
    <!-- Profile Hero — Asymmetric avatar + intro -->
    <section class="profile-hero">
      <div class="hero-grid">
        <div class="hero-visual">
          <div class="avatar-frame">
            <img
              src="https://picsum.photos/seed/author-portrait/400/400"
              alt="作者头像"
              class="avatar-img"
            />
            <div class="avatar-accent"></div>
          </div>
          <div class="visual-ornament"></div>
        </div>

        <div class="hero-text">
          <div class="hero-greeting">
            <span class="greeting-icon">~</span>
            <span class="greeting-label">whisper</span>
          </div>
          <h1 class="hero-name">你好，我是这里的作者</h1>
          <p class="hero-bio">
            这里记录关于技术、阅读与生活的思考。
            <br />写作是整理思绪的方式，也是对世界保持好奇的练习。
          </p>
          <div class="hero-meta">
            <span class="meta-item">
              <span class="meta-count">{{ posts.length }}</span>
              <span class="meta-label">篇文章</span>
            </span>
            <span class="meta-divider"></span>
            <span class="meta-item">
              <span class="meta-count">{{ tagCount }}</span>
              <span class="meta-label">个话题</span>
            </span>
          </div>
        </div>
      </div>

      <div class="hero-diagonal"></div>
    </section>

    <!-- Post List — Staggered -->
    <section class="section-block">
      <div class="container">
        <div class="section-head">
          <h2 class="section-title">文章</h2>
          <div class="ornament-line ornament-line--accent"></div>
        </div>

        <div v-if="loading" class="empty-state">
          <span class="loading-icon">~</span>
          <p>正在翻阅...</p>
        </div>
        <div v-else-if="posts.length === 0" class="empty-state">
          <p>还没有文章，开始写第一篇吧</p>
        </div>
        <div v-else class="post-list">
          <PostCard
            v-for="(post, idx) in posts"
            :key="post.slug"
            :title="post.title"
            :date="post.date"
            :summary="post.summary"
            :slug="post.slug"
            :class="idx % 2 === 0 ? 'post-stagger-left' : 'post-stagger-right'"
            :style="{ animationDelay: idx * 0.12 + 's' }"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { usePosts } from '../composables/usePosts.js'
import PostCard from '../components/PostCard.vue'

const { posts, loading, loadAllPosts } = usePosts()

const tagCount = computed(() => {
  const tags = new Set()
  posts.value.forEach(p => p.tags?.forEach(t => tags.add(t)))
  return tags.size
})

onMounted(() => {
  loadAllPosts()
})
</script>

<style scoped>
/* ===== Profile Hero ===== */
.profile-hero {
  padding: var(--spacing-3xl) 0 var(--spacing-4xl);
  position: relative;
  overflow: hidden;
}

.hero-grid {
  max-width: var(--max-width-wide);
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: var(--spacing-3xl);
  align-items: center;
}

/* Avatar side */
.hero-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-frame {
  position: relative;
  width: 180px;
  height: 180px;
  z-index: 1;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-float);
  display: block;
}

.avatar-accent {
  position: absolute;
  inset: -10px;
  border: 2px solid var(--color-accent);
  border-radius: calc(var(--radius-xl) + 10px);
  opacity: 0.2;
  pointer-events: none;
}

.visual-ornament {
  position: absolute;
  right: -40px;
  bottom: -30px;
  width: 120px;
  height: 100px;
  background:
    radial-gradient(ellipse at 40% 30%, rgba(90, 122, 74, 0.08) 0%, transparent 65%),
    radial-gradient(ellipse at 60% 50%, rgba(191, 94, 43, 0.06) 0%, transparent 60%);
  border-radius: 40% 60% 50% 50% / 50% 40% 60% 50%;
  pointer-events: none;
  z-index: -1;
}

/* Text side */
.hero-text {
  padding-top: var(--spacing-md);
}

.hero-greeting {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: var(--spacing-lg);
}

.greeting-icon {
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: var(--color-accent);
  animation: sway 4s ease-in-out infinite;
  display: inline-block;
}

.greeting-label {
  font-family: var(--font-sans);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-lighter);
  padding: 3px 12px;
  background: var(--color-ink-light);
  border-radius: 20px;
}

.hero-name {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 0.04em;
  color: var(--color-text);
  margin-bottom: var(--spacing-lg);
}

.hero-bio {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  line-height: 2;
  color: var(--color-text-light);
  margin-bottom: var(--spacing-xl);
}

.hero-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.meta-item {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.meta-count {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-accent);
}

.meta-label {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-text-lighter);
  letter-spacing: 0.03em;
}

.meta-divider {
  width: 1px;
  height: 20px;
  background: var(--color-border);
}

/* Diagonal accent line */
.hero-diagonal {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    105deg,
    transparent 15%,
    var(--color-border) 25%,
    var(--color-accent-green) 50%,
    var(--color-accent) 65%,
    var(--color-border) 75%,
    transparent 85%
  );
  opacity: 0.4;
}

/* ===== Section Head ===== */
.section-head {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
}

.section-title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
}

/* ===== Post List — Staggered ===== */
.post-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
}

.post-stagger-left {
  margin-right: auto;
  margin-left: 0;
  width: 100%;
}

.post-stagger-right {
  margin-left: auto;
  margin-right: 0;
  width: 100%;
}

.post-list > * {
  animation: fade-up 0.6s ease-out both;
}

/* ===== Empty State ===== */
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

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-2xl);
    text-align: center;
  }

  .hero-visual {
    order: -1;
  }

  .avatar-frame {
    width: 140px;
    height: 140px;
  }

  .visual-ornament {
    display: none;
  }

  .hero-name {
    font-size: 1.7rem;
  }

  .hero-bio {
    font-size: 0.95rem;
  }

  .hero-meta {
    justify-content: center;
  }

  .hero-greeting {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .profile-hero {
    padding: var(--spacing-2xl) 0 var(--spacing-3xl);
  }

  .hero-name {
    font-size: 1.5rem;
  }

  .hero-bio {
    font-size: 0.9rem;
    line-height: 1.9;
  }

  .section-title {
    font-size: 1.4rem;
  }
}
</style>
