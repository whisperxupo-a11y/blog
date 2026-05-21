<template>
  <div class="about-page">
    <header class="about-header">
      <div class="header-ornament"></div>
      <h1 class="about-title">关于</h1>
    </header>

    <section class="about-card">
      <p>你好，我是这里的作者。</p>
      <p>
        这是一个轻量级博客，基于 Vue 3 + Vite
        构建。文章以 Markdown 格式编写，构建为纯静态页面——没有数据库、没有后端、没有复杂配置。
      </p>
      <p>专注于写作与阅读，保持简单。</p>
    </section>

    <section class="contact-card">
      <div class="contact-header">
        <span class="contact-icon-dot"></span>
        <h2>联系方式</h2>
      </div>
      <p>如有兴趣交流，欢迎通过以下方式联系：</p>
      <ul>
        <li>
          <span class="dot dot--accent"></span>
          GitHub: <a href="https://github.com" target="_blank" rel="noopener noreferrer">@username</a>
        </li>
        <li>
          <span class="dot dot--green"></span>
          Email: <a href="mailto:hello@example.com">hello@example.com</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>
.about-page {
  padding: var(--spacing-3xl) 0 var(--spacing-4xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
}

.about-header {
  text-align: center;
  padding-bottom: var(--spacing-md);
  animation: fade-in 0.6s ease-out;
}

.header-ornament {
  width: 44px;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--color-accent-green), var(--color-accent), transparent);
  border-radius: 2px;
  margin: 0 auto var(--spacing-md);
  opacity: 0.6;
}

.about-title {
  font-family: var(--font-serif);
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  position: relative;
  display: inline-block;
}

.about-title::after {
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

.about-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: var(--shadow-card);
  border: 1px solid var(--color-border-light);
  font-family: var(--font-serif);
  font-size: 1.1rem;
  line-height: 2.1;
  color: var(--color-text-light);
  animation: fade-in 0.6s ease-out 0.1s both;
}

.about-card p {
  margin-bottom: var(--spacing-md);
}

.about-card p:last-child {
  margin-bottom: 0;
}

.contact-card {
  background: var(--color-surface-warm);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  border: 1px solid var(--color-border-light);
  animation: fade-in 0.6s ease-out 0.2s both;
}

.contact-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.contact-icon-dot {
  width: 8px;
  height: 8px;
  background: var(--color-accent);
  border-radius: var(--radius-organic);
}

.contact-header h2 {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: 0.03em;
}

.contact-card p {
  font-size: 0.95rem;
  color: var(--color-text-light);
  margin-bottom: var(--spacing-lg);
}

.contact-card ul {
  list-style: none;
  padding: 0;
}

.contact-card li {
  font-size: 0.95rem;
  color: var(--color-text-lighter);
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
}

.dot--accent {
  background: var(--color-accent);
}

.dot--green {
  background: var(--color-accent-green);
}

.contact-card a {
  color: var(--color-accent);
  background: linear-gradient(currentColor, currentColor) bottom / 0% 1px no-repeat;
  padding-bottom: 1px;
  transition: color 0.2s, background-size 0.3s;
}

.contact-card a:hover {
  color: var(--color-accent-hover);
  background-size: 100% 1px;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 480px) {
  .about-title {
    font-size: 1.8rem;
  }

  .about-card,
  .contact-card {
    padding: var(--spacing-xl);
  }

  .about-card {
    font-size: 1rem;
  }
}
</style>
