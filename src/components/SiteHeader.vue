<template>
  <header class="site-header">
    <div class="header-inner container">
      <router-link to="/" class="site-name">
        <span class="name-icon">~</span>
        <span class="name-text">轻量级博客</span>
      </router-link>
      <nav class="header-nav">
        <router-link to="/" class="nav-link">
          <span class="nav-dot"></span>
          文章
        </router-link>
        <router-link to="/archive" class="nav-link">
          <span class="nav-dot"></span>
          归档
        </router-link>
        <router-link to="/about" class="nav-link">
          <span class="nav-dot"></span>
          关于
        </router-link>
      </nav>
    </div>
    <div class="header-leaf header-leaf--left"></div>
    <div class="header-leaf header-leaf--right"></div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: linear-gradient(180deg, rgba(250, 245, 235, 0.95) 60%, rgba(250, 245, 235, 0.8) 100%);
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
  border-bottom: 1px solid var(--color-border-light);
  overflow: hidden;
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

.name-icon {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  color: var(--color-accent);
  margin-right: 6px;
  display: inline-block;
  animation: leaf-sway 4s ease-in-out infinite;
}

.name-text {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--color-text);
}

.header-nav {
  display: flex;
  gap: var(--spacing-xl);
  align-items: center;
}

.nav-link {
  font-size: 0.9rem;
  color: var(--color-text-light);
  transition: color 0.3s;
  letter-spacing: 0.03em;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 0;
  position: relative;
}

.nav-dot {
  width: 5px;
  height: 5px;
  background: var(--color-accent-green);
  border-radius: 50%;
  display: inline-block;
  opacity: 0;
  transform: scale(0);
  transition: opacity 0.3s, transform 0.3s;
}

.nav-link:hover .nav-dot,
.nav-link.router-link-exact-active .nav-dot {
  opacity: 1;
  transform: scale(1);
}

.nav-link:hover {
  color: var(--color-accent);
}

.nav-link.router-link-exact-active {
  color: var(--color-accent);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--color-accent);
  border-radius: 1px;
  transform: scaleX(0);
  transition: transform 0.3s;
  transform-origin: right;
}

.nav-link:hover::after,
.nav-link.router-link-exact-active::after {
  transform: scaleX(1);
  transform-origin: left;
}

.header-leaf {
  position: absolute;
  top: 0;
  pointer-events: none;
  opacity: 0.06;
}

.header-leaf--left {
  left: 5%;
  width: 80px;
  height: 120px;
  background:
    radial-gradient(ellipse at 70% 30%, var(--color-accent-green) 0%, transparent 70%),
    radial-gradient(ellipse at 30% 60%, var(--color-accent-green) 0%, transparent 70%),
    radial-gradient(ellipse at 60% 80%, var(--color-accent) 0%, transparent 60%);
  border-radius: 30% 70% 50% 50% / 30% 40% 60% 70%;
  transform: rotate(-15deg);
  animation: leaf-float 6s ease-in-out infinite;
}

.header-leaf--right {
  right: 8%;
  width: 60px;
  height: 90px;
  background:
    radial-gradient(ellipse at 40% 20%, var(--color-accent-green) 0%, transparent 65%),
    radial-gradient(ellipse at 60% 50%, var(--color-accent) 0%, transparent 60%);
  border-radius: 70% 30% 40% 60% / 40% 60% 40% 60%;
  transform: rotate(20deg);
  animation: leaf-float 5s ease-in-out 1s infinite;
}

@keyframes leaf-sway {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  75% { transform: rotate(-3deg); }
}

@keyframes leaf-float {
  0%, 100% { transform: translateY(0) rotate(-15deg); }
  50% { transform: translateY(-6px) rotate(-12deg); }
}

@media (max-width: 480px) {
  .header-inner {
    height: 56px;
  }

  .name-text {
    font-size: 1.05rem;
  }

  .header-nav {
    gap: var(--spacing-md);
  }

  .header-leaf {
    display: none;
  }
}
</style>
