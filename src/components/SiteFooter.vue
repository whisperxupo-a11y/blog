<template>
  <footer class="site-footer">
    <div class="footer-deco">
      <span class="deco-leaf deco-leaf--1"></span>
      <span class="deco-leaf deco-leaf--2"></span>
      <span class="deco-leaf deco-leaf--3"></span>
    </div>
    <div class="container footer-inner">
      <div class="footer-top">
        <span class="footer-brand">轻量级博客</span>
        <span class="footer-dot"></span>
        <span class="footer-copy">&copy; {{ year }}</span>
      </div>
      <p class="footer-tagline">写作是思想在纸上的光合作用</p>
      <p class="footer-tech">Powered by Vue &amp; Vite</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  margin-top: var(--spacing-3xl);
  padding: var(--spacing-3xl) 0 var(--spacing-2xl);
  position: relative;
  background:
    linear-gradient(180deg, transparent 0%, rgba(107, 142, 90, 0.03) 100%);
  border-top: 1px solid var(--color-border-light);
}

.footer-deco {
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 40px;
  overflow: hidden;
  pointer-events: none;
}

.deco-leaf {
  position: absolute;
  top: 0;
  width: 60px;
  height: 40px;
  opacity: 0.08;
  background: var(--color-accent-green);
  border-radius: 50%;
}

.deco-leaf--1 {
  left: 15%;
  border-radius: 30% 70% 50% 50% / 40% 50% 50% 60%;
  animation: footer-leaf 8s ease-in-out infinite;
}

.deco-leaf--2 {
  left: 48%;
  border-radius: 60% 40% 30% 70% / 50% 60% 40% 50%;
  animation: footer-leaf 7s ease-in-out 2s infinite;
  background: var(--color-accent);
}

.deco-leaf--3 {
  right: 18%;
  border-radius: 40% 60% 50% 50% / 60% 40% 60% 40%;
  animation: footer-leaf 9s ease-in-out 1s infinite;
}

.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.footer-top {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 0.9rem;
}

.footer-brand {
  font-family: var(--font-serif);
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: 0.03em;
}

.footer-dot {
  width: 4px;
  height: 4px;
  background: var(--color-accent);
  border-radius: 50%;
  display: inline-block;
}

.footer-copy {
  color: var(--color-text-lighter);
}

.footer-tagline {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  color: var(--color-text-lighter);
  font-style: italic;
  letter-spacing: 0.02em;
}

.footer-tech {
  font-size: 0.8rem;
  color: var(--color-text-lighter);
  opacity: 0.7;
}

@keyframes footer-leaf {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-5px) scale(1.05); }
}

@media (max-width: 480px) {
  .site-footer {
    padding: var(--spacing-2xl) 0 var(--spacing-xl);
  }

  .deco-leaf {
    display: none;
  }
}
</style>
