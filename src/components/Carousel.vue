<template>
  <div class="carousel" @mouseenter="pause" @mouseleave="resume">
    <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div
        v-for="(slide, idx) in slides"
        :key="idx"
        class="carousel-slide"
      >
        <div class="slide-image-wrapper">
          <img :src="slide.image" :alt="slide.title" class="slide-image" />
          <div class="slide-overlay"></div>
        </div>
        <div class="slide-caption" v-if="slide.title">
          <h3 class="caption-title">{{ slide.title }}</h3>
          <p class="caption-text" v-if="slide.description">{{ slide.description }}</p>
        </div>
      </div>
    </div>

    <div class="carousel-dots">
      <button
        v-for="(slide, idx) in slides"
        :key="idx"
        class="carousel-dot"
        :class="{ active: idx === currentIndex }"
        @click="goTo(idx)"
        :aria-label="'跳转到第 ' + (idx + 1) + ' 张图片'"
      ></button>
    </div>

    <button class="carousel-arrow carousel-arrow--prev" @click="prev" aria-label="上一张">
      <span class="arrow-shape">&lsaquo;</span>
    </button>
    <button class="carousel-arrow carousel-arrow--next" @click="next" aria-label="下一张">
      <span class="arrow-shape">&rsaquo;</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  slides: {
    type: Array,
    required: true,
    validator: (v) => v.every(s => s.image)
  }
})

const currentIndex = ref(0)
let timer = null
const INTERVAL = 5000

function next() {
  currentIndex.value = (currentIndex.value + 1) % props.slides.length
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + props.slides.length) % props.slides.length
}

function goTo(idx) {
  currentIndex.value = idx
}

function startTimer() {
  stopTimer()
  timer = setInterval(next, INTERVAL)
}

function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function pause() {
  stopTimer()
}

function resume() {
  startTimer()
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})
</script>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: 0 2px 20px rgba(0,0,0,0.05);
}

.carousel-track {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
  will-change: transform;
}

.carousel-slide {
  flex: 0 0 100%;
  position: relative;
  min-height: 0;
}

.slide-image-wrapper {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}

.carousel-slide:not(:first-child .carousel-slide) .slide-image {
  /* handled by parent transitions */
}

.slide-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(61, 52, 40, 0.05) 0%,
    transparent 40%,
    rgba(61, 52, 40, 0.25) 100%
  );
  pointer-events: none;
}

.slide-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--spacing-xl) var(--spacing-xl) var(--spacing-lg);
  color: #fff;
  z-index: 2;
}

.caption-title {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-shadow: 0 1px 4px rgba(0,0,0,0.3);
  margin-bottom: var(--spacing-xs);
}

.caption-text {
  font-size: 0.9rem;
  opacity: 0.85;
  text-shadow: 0 1px 3px rgba(0,0,0,0.25);
  letter-spacing: 0.02em;
}

.carousel-dots {
  position: absolute;
  bottom: var(--spacing-lg);
  right: var(--spacing-lg);
  display: flex;
  gap: var(--spacing-sm);
  z-index: 3;
}

.carousel-dot {
  width: 28px;
  height: 4px;
  border-radius: 2px;
  border: none;
  background: rgba(255,255,255,0.4);
  cursor: pointer;
  transition: background 0.35s, transform 0.35s;
  padding: 0;
  backdrop-filter: blur(4px);
}

.carousel-dot:hover {
  background: rgba(255,255,255,0.65);
  transform: scaleY(1.6);
}

.carousel-dot.active {
  background: rgba(255,255,255,0.9);
  width: 36px;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(8px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.35s, background 0.3s, transform 0.3s;
  box-shadow: 0 1px 8px rgba(0,0,0,0.08);
}

.carousel:hover .carousel-arrow {
  opacity: 1;
}

.carousel-arrow:hover {
  background: rgba(255,255,255,0.9);
  transform: translateY(-50%) scale(1.08);
}

.carousel-arrow--prev {
  left: var(--spacing-md);
}

.carousel-arrow--next {
  right: var(--spacing-md);
}

.arrow-shape {
  font-size: 1.5rem;
  color: var(--color-text);
  line-height: 1;
  font-family: var(--font-serif);
}

@media (max-width: 768px) {
  .carousel {
    border-radius: var(--radius-md);
  }

  .slide-image-wrapper {
    aspect-ratio: 3 / 2;
  }

  .caption-title {
    font-size: 1.1rem;
  }

  .carousel-arrow {
    width: 34px;
    height: 34px;
  }

  .carousel-dot {
    width: 22px;
    height: 3px;
  }

  .carousel-dot.active {
    width: 28px;
  }
}
</style>
