<template>
  <header class="site-header">
    <div class="header-inner">
      <router-link to="/" class="site-name">
        <span class="name-icon">~</span>
        <span class="name-text">轻量级博客</span>
      </router-link>
      <nav class="header-nav">
        <router-link to="/" class="nav-link">
          文章
          <span class="nav-indicator"></span>
        </router-link>
        <router-link to="/archive" class="nav-link">
          归档
          <span class="nav-indicator"></span>
        </router-link>
        <router-link to="/about" class="nav-link">
          关于
          <span class="nav-indicator"></span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: linear-gradient(180deg, rgba(250, 248, 243, 0.94) 60%, rgba(250, 248, 243, 0.7) 100%);
  backdrop-filter: blur(14px) saturate(120%);
  -webkit-backdrop-filter: blur(14px) saturate(120%);
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 68px;
  max-width: var(--max-width-wide);
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
}

.site-name {
  display: flex;
  align-items: center;
  gap: 7px;
  flex-shrink: 0;
}

.name-icon {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-accent);
  display: inline-block;
  animation: sway 4s ease-in-out infinite;
  line-height: 1;
}

.name-text {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--color-text);
}

.header-nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--color-text-light);
  letter-spacing: 0.04em;
  padding: 6px 0;
  position: relative;
  transition: color 0.3s;
}

.nav-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 18px;
  height: 1.5px;
  background: var(--color-accent);
  border-radius: 1px;
  transition: transform 0.35s, width 0.35s;
}

.nav-link:hover .nav-indicator {
  transform: translateX(-50%) scaleX(1);
}

.nav-link.router-link-exact-active .nav-indicator {
  transform: translateX(-50%) scaleX(1);
  width: 24px;
}

.nav-link:hover {
  color: var(--color-accent);
}

.nav-link.router-link-exact-active {
  color: var(--color-accent);
}

@media (max-width: 640px) {
  .header-inner {
    height: 60px;
    padding: 0 var(--spacing-md);
  }

  .name-text {
    font-size: 1.05rem;
  }

  .header-nav {
    gap: 1.25rem;
  }

  .nav-link {
    font-size: 0.8rem;
  }
}
</style>
