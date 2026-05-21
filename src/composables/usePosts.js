import { ref } from 'vue'

const postModules = import.meta.glob('/content/posts/*.md', {
  query: '?raw',
  eager: true,
  import: 'default'
})

function parseFrontmatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const yamlBlock = match[1]
  const content = match[2]
  const data = {}

  for (const line of yamlBlock.split('\n')) {
    const keyMatch = line.match(/^(\w[\w-]*):\s*(.*)/)
    if (!keyMatch) continue

    const key = keyMatch[1]
    let value = keyMatch[2].trim()

    // Array values (indented with -)
    if (value === '' || value === '[]') {
      data[key] = []
      continue
    }

    // Remove surrounding quotes
    value = value.replace(/^['"](.*)['"]$/, '$1')
    data[key] = value
  }

  // Collect array items that follow key:
  let currentArrayKey = null
  const result = { data: {}, content }
  for (const line of yamlBlock.split('\n')) {
    const keyMatch = line.match(/^(\w[\w-]*):\s*(.*)/)
    if (keyMatch) {
      const key = keyMatch[1]
      let value = keyMatch[2].trim()
      if (value === '' || value === '[]') {
        currentArrayKey = key
        result.data[key] = []
      } else {
        currentArrayKey = null
        value = value.replace(/^['"](.*)['"]$/, '$1')
        result.data[key] = ['true', 'false', 'yes', 'no'].includes(value)
          ? value === 'true' || value === 'yes'
          : value
      }
    } else {
      const arrMatch = line.match(/^\s+-\s+(.+)/)
      if (arrMatch && currentArrayKey) {
        result.data[currentArrayKey].push(arrMatch[1].replace(/^['"](.*)['"]$/, '$1'))
      }
    }
  }

  return result
}

function stripMarkdown(md) {
  return md
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    .replace(/>\s+/gm, '')
    .replace(/[-*+]\s+/g, '')
    .replace(/\n{2,}/g, '\n')
    .trim()
}

export function usePosts() {
  const posts = ref([])
  const loading = ref(false)
  let initialized = false

  function loadAllPosts() {
    if (initialized) return
    loading.value = true

    const loaded = []
    for (const [filepath, raw] of Object.entries(postModules)) {
      const slug = filepath.split('/').pop().replace(/\.md$/, '')
      const { data, content } = parseFrontmatter(raw)
      loaded.push({
        slug,
        title: data.title || slug,
        date: data.date || null,
        summary: data.summary || stripMarkdown(content).slice(0, 200),
        content,
        tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : [])
      })
    }

    loaded.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    posts.value = loaded
    loading.value = false
    initialized = true
  }

  function getPost(slug) {
    return posts.value.find(p => p.slug === slug) || null
  }

  return { posts, loading, loadAllPosts, getPost }
}
