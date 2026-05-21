<template>
  <div class="post-content" v-html="htmlContent"></div>
</template>

<script setup>
import { computed } from 'vue'
import { renderMarkdown } from '../utils/markdown.js'
import '../assets/styles/markdown.css'

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const htmlContent = computed(() => renderMarkdown(props.content))
</script>
