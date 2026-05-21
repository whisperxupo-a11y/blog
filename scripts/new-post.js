import { writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const postsDir = join(__dirname, '..', 'content', 'posts')

const title = process.argv[2]

if (!title) {
  console.log('用法: npm run new-post -- "文章标题"')
  console.log('示例: npm run new-post -- "我的新文章"')
  process.exit(1)
}

const date = new Date().toISOString().split('T')[0]
const slug = title
  .replace(/[^\w一-鿿]/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '')
  .toLowerCase() || 'untitled'

const filePath = join(postsDir, `${slug}.md`)

if (existsSync(filePath)) {
  console.log(`文件已存在: ${slug}.md`)
  process.exit(1)
}

const template = `---
title: ${title}
date: ${date}
summary: 文章摘要，简要描述内容。
tags:
  - 标签1
  - 标签2
---

## 正文

从这里开始写作。Markdown 格式：

- 支持**粗体**和*斜体*
- 支持[链接]()和图片
- 支持代码块

\`\`\`javascript
// 代码示例
console.log('你好，世界')
\`\`\`

> 引用文字

完成写作后运行 \`npm run build\` 构建发布。
`

writeFileSync(filePath, template, 'utf-8')
console.log(`已创建: content/posts/${slug}.md`)
console.log(`标题: ${title}`)
console.log(`日期: ${date}`)
