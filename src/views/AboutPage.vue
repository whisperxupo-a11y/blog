<template>
  <div class="about-page">
    <section class="about-hero">
      <div class="about-grid">
        <div class="about-visual">
          <div class="avatar-large">
            <img
              src="https://picsum.photos/seed/author-portrait/400/400"
              alt="作者头像"
              class="avatar-img"
            />
            <div class="avatar-ring"></div>
          </div>
          <div class="visual-blur"></div>
        </div>

        <div class="about-text">
          <div class="ornament-line ornament-line--accent"></div>
          <h1 class="about-title">关于作者</h1>
          <div class="about-prose">
            <p>
              你好，我是这里的作者。这个博客是我写作、思考和记录的地方。
            </p>
            <p>
              基于 Vue 3 + Vite 构建的轻量级博客。文章以 Markdown 格式编写，构建为纯静态页面——没有数据库、没有后端、没有复杂配置。专注于写作与阅读本身。
            </p>
            <p>
              喜欢简单的事物：干净的文字、良好的排版、安静的阅读体验。如果你也有类似的偏好，欢迎常来看看。
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="contact-section">
      <div class="contact-inner">
        <div class="contact-ornament"></div>
        <h2 class="contact-title">联系与交流</h2>
        <div class="contact-links">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-link"
          >
            <span class="link-icon">&#8599;</span>
            <span class="link-text">
              <span class="link-label">GitHub</span>
              <span class="link-value">@username</span>
            </span>
          </a>
          <a
            href="mailto:hello@example.com"
            class="contact-link"
          >
            <span class="link-icon">&#8599;</span>
            <span class="link-text">
              <span class="link-label">Email</span>
              <span class="link-value">hello@example.com</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>
.about-page {
  padding: var(--spacing-3xl) 0 var(--spacing-4xl);
}

/* ===== Hero Grid ===== */
.about-hero {
  margin-bottom: var(--spacing-4xl);
}

.about-grid {
  max-width: var(--max-width-wide);
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: var(--spacing-3xl);
  align-items: center;
}

/* Visual side */
.about-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-large {
  width: 200px;
  height: 200px;
  position: relative;
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

.avatar-ring {
  position: absolute;
  inset: -14px;
  border: 2px solid var(--color-accent-green);
  border-radius: calc(var(--radius-xl) + 14px);
  opacity: 0.15;
  pointer-events: none;
}

.visual-blur {
  position: absolute;
  width: 280px;
  height: 180px;
  background: radial-gradient(ellipse, rgba(90, 122, 74, 0.06) 0%, transparent 70%);
  bottom: -40px;
  left: -30px;
  border-radius: 50%;
  pointer-events: none;
  z-index: -1;
}

/* Text side */
.about-text {
  animation: fade-up 0.7s ease-out;
}

.ornament-line {
  width: 48px;
  height: 2px;
  border-radius: 1px;
  background: linear-gradient(90deg, var(--color-accent-green), var(--color-accent));
  margin-bottom: var(--spacing-lg);
  opacity: 0.6;
}

.about-title {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--color-text);
  margin-bottom: var(--spacing-xl);
}

.about-prose {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  line-height: 2.1;
  color: var(--color-text-light);
}

.about-prose p {
  margin-bottom: var(--spacing-lg);
}

.about-prose p:last-child {
  margin-bottom: 0;
}

/* ===== Contact Section ===== */
.contact-section {
  max-width: var(--max-width-content);
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
}

.contact-inner {
  background: var(--color-bg-warm);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  border: 1px solid var(--color-border-light);
  position: relative;
}

.contact-ornament {
  width: 32px;
  height: 2px;
  background: linear-gradient(90deg, var(--color-accent), var(--color-accent-green));
  border-radius: 1px;
  margin-bottom: var(--spacing-lg);
  opacity: 0.5;
}

.contact-title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-text);
  margin-bottom: var(--spacing-xl);
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.contact-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
}

.contact-link:hover {
  border-color: var(--color-accent);
  transform: translateX(4px);
  box-shadow: var(--shadow-card-hover);
}

.link-icon {
  font-size: 0.9rem;
  color: var(--color-text-lighter);
  transition: color 0.3s;
  flex-shrink: 0;
}

.contact-link:hover .link-icon {
  color: var(--color-accent);
}

.link-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.link-label {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--color-text-lighter);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.link-value {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  color: var(--color-text);
  letter-spacing: 0.02em;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-2xl);
    text-align: center;
  }

  .avatar-large {
    width: 160px;
    height: 160px;
  }

  .ornament-line {
    margin-left: auto;
    margin-right: auto;
  }

  .about-title {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .about-title {
    font-size: 1.6rem;
  }

  .about-prose {
    font-size: 0.95rem;
  }

  .contact-inner {
    padding: var(--spacing-xl);
  }
}
</style>
