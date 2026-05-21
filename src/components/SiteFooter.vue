<template>
  <footer class="site-footer">
    <div class="footer-line"></div>
    <div class="footer-inner">
      <div class="footer-main">
        <span class="footer-brand">轻量级博客</span>
        <span class="footer-sep">·</span>
        <span class="footer-copy">&copy; {{ year }}</span>
      </div>
      <p class="footer-tagline">写作是思想在纸上的光合作用</p>
      <p class="footer-tech">Vue &amp; Vite</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  margin-top: auto;
  padding: var(--spacing-3xl) 0 var(--spacing-2xl);
  position: relative;
}

.footer-line {
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-accent-green), var(--color-accent));
  opacity: 0.3;
  margin: 0 auto var(--spacing-2xl);
  border-radius: 1px;
}

.footer-inner {
  max-width: var(--max-width-content);
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
}

.footer-main {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 0.85rem;
}

.footer-brand {
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: 0.04em;
}

.footer-sep {
  color: var(--color-border);
}

.footer-copy {
  color: var(--color-text-lighter);
  font-family: var(--font-sans);
}

.footer-tagline {
  font-family: var(--font-serif);
  font-size: 0.9rem;
  color: var(--color-text-lighter);
  font-style: italic;
  letter-spacing: 0.02em;
}

.footer-tech {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  color: var(--color-text-faint);
  letter-spacing: 0.05em;
}

@media (max-width: 480px) {
  .site-footer {
    padding: var(--spacing-2xl) 0 var(--spacing-xl);
  }
}
</style>
