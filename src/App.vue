<template>
  <div id="app-shell">
    <SiteHeader />
    <main>
      <router-view />
    </main>
    <SiteFooter />
    <AmbientPlayer />
  </div>
</template>

<script setup>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import AmbientPlayer from './components/AmbientPlayer.vue'
</script>

<style>
#app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
