<template>
  <div class="ambient-player" :class="{ expanded: expanded }">
    <div v-if="expanded" class="player-panel">
      <div class="panel-header">
        <span class="panel-icon">~</span>
        <span class="panel-title">氛围音</span>
        <span v-if="activeCount > 0" class="panel-badge">{{ activeCount }}</span>
      </div>

      <div class="track-list">
        <div
          v-for="track in tracks"
          :key="track.id"
          class="track-row"
          :class="{ active: track.playing }"
        >
          <button
            class="track-toggle"
            :class="{ on: track.playing }"
            @click="toggle(track.id)"
            :aria-label="track.playing ? '关闭' + track.name : '播放' + track.name"
          >
            <span class="toggle-dot"></span>
          </button>

          <span class="track-name">{{ track.name }}</span>

          <input
            type="range"
            min="0"
            max="100"
            :value="track.volume * 100"
            @input="setVolume(track.id, $event.target.value / 100)"
            class="track-slider"
            aria-label="音量"
          />
        </div>
      </div>
    </div>

    <button
      class="player-fab"
      :class="{ breathing: activeCount > 0 }"
      @click="togglePanel"
      :aria-label="expanded ? '收起播放器' : '打开氛围音'"
    >
      <span class="fab-icon">~</span>
    </button>
  </div>
</template>

<script setup>
import { useAmbient } from '../composables/useAmbient.js'

const { tracks, expanded, activeCount, toggle, setVolume, togglePanel } = useAmbient()
</script>

<style scoped>
.ambient-player {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--spacing-md);
}

.player-panel {
  background: rgba(254, 253, 251, 0.9);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  border: 1px solid var(--color-border-light);
  box-shadow: 0 8px 32px rgba(44, 36, 25, 0.1);
  min-width: 240px;
  animation: panel-enter 0.35s ease-out;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border-light);
}

.panel-icon {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--color-accent);
  animation: sway 3s ease-in-out infinite;
  display: inline-block;
}

.panel-title {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: 0.03em;
}

.panel-badge {
  margin-left: auto;
  font-family: var(--font-sans);
  font-size: 0.68rem;
  padding: 0.1em 0.55em;
  background: var(--color-accent);
  color: #fff;
  border-radius: 10px;
  font-weight: 600;
}

.track-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.track-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  transition: background 0.25s;
}

.track-row.active {
  background: rgba(90, 122, 74, 0.05);
}

.track-toggle {
  width: 36px;
  height: 22px;
  border-radius: 11px;
  border: none;
  background: var(--color-border);
  cursor: pointer;
  position: relative;
  transition: background 0.3s;
  flex-shrink: 0;
  padding: 0;
}

.track-toggle.on {
  background: var(--color-accent-green);
}

.toggle-dot {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.3s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.track-toggle.on .toggle-dot {
  transform: translateX(14px);
}

.track-name {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--color-text-light);
  letter-spacing: 0.02em;
  min-width: 36px;
}

.track-slider {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 3px;
  border-radius: 2px;
  background: var(--color-border);
  outline: none;
  cursor: pointer;
}

.track-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-accent);
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.track-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.track-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-accent);
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.player-fab {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--color-border-light);
  background: rgba(254, 253, 251, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 2px 16px rgba(44, 36, 25, 0.08);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s, box-shadow 0.3s, background 0.3s;
}

.player-fab:hover {
  transform: scale(1.08);
  box-shadow: 0 4px 24px rgba(44, 36, 25, 0.14);
}

.player-fab.breathing {
  animation: breathe 2.5s ease-in-out infinite;
}

.fab-icon {
  font-family: var(--font-display);
  font-size: 1.3rem;
  color: var(--color-accent);
  transition: transform 0.3s;
  display: inline-block;
}

.player-fab:hover .fab-icon {
  transform: scale(1.15);
}

.player-fab.breathing .fab-icon {
  animation: sway 3s ease-in-out infinite;
}

@keyframes panel-enter {
  from { opacity: 0; transform: translateY(12px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes breathe {
  0%, 100% { box-shadow: 0 0 0 0 rgba(191, 94, 43, 0.3); }
  50% { box-shadow: 0 0 0 10px rgba(191, 94, 43, 0); }
}

@keyframes sway {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(6deg); }
}

@media (max-width: 480px) {
  .ambient-player {
    bottom: 20px;
    right: 16px;
  }

  .player-panel {
    min-width: 220px;
    padding: var(--spacing-lg);
  }

  .player-fab {
    width: 42px;
    height: 42px;
  }
}
</style>
