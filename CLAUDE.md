# 轻量级博客

Vue 3 + Vite 纯静态博客，Markdown 写作，零后端。

## 快速命令

```bash
npm run dev           # 开发服务器 http://localhost:5173
npm run build         # 构建到 dist/
npm run preview       # 预览构建产物
npm run new-post -- "文章标题"  # 脚手架新建文章
```

## 项目结构

```
content/posts/          ← Markdown 文章（唯一需要手动编辑的地方）
src/
├── main.js             ← 路由配置
├── App.vue             ← 根布局（Header + main + Footer + AmbientPlayer）
├── views/              ← 页面：HomePage / PostPage / AboutPage / ArchivePage
├── components/         ← 组件：PostCard / PostCalendar / Carousel / AmbientPlayer / ...
├── composables/
│   ├── usePosts.js     ← 文章加载（import.meta.glob 导入 .md 文件）
│   └── useAmbient.js   ← Web Audio API 氛围音合成
├── utils/markdown.js   ← markdown-it + highlight.js 配置
└── assets/styles/      ← CSS 变量 / 全局样式 / Markdown 排版
scripts/new-post.js     ← 新文章脚手架
```

## 如何写文章

1. `npm run new-post -- "标题"` 生成模板文件
2. 编辑 `content/posts/xxx.md`，修改 frontmatter 中的 summary 和 tags
3. 写 Markdown 正文
4. `npm run build` 构建

Frontmatter 格式：
```yaml
---
title: 文章标题
date: 2026-05-21
summary: 摘要
tags:
  - 标签1
  - 标签2
---
```

## 技术栈

| 层 | 选型 |
|---|------|
| 框架 | Vue 3.5 (Composition API + `<script setup>`) |
| 构建 | Vite 6 + @vitejs/plugin-vue |
| 路由 | Vue Router 4 (history mode) |
| Markdown | markdown-it (html: true, linkify, typographer) |
| 代码高亮 | highlight.js (按需加载 6 种语言) |
| 轮播图 | 自写 (picsum.photos 占位，可替换) |
| 氛围音 | Web Audio API 合成 (雨声/林间/溪流/篝火) |
| 日历 | 自写月历组件 |
| 部署 | 纯静态文件，任意 HTTP 服务器 |

## 设计系统

有机自然风格（"Forest Journal"）：
- 背景：`#faf5eb`（暖奶油色）+ 纸纹噪声 + 径向光晕
- 主文字：`#3d3428`（树皮棕）
- 强调色：`#c57633`（陶土橙）/ `#6b8e5a`（鼠尾草绿）
- 正文字体：Noto Serif SC（衬线）
- UI 字体：PingFang SC（无衬线）
- 布局：680px 内容区 / 960px 宽容器

## 定制指南

- **替换轮播图**：编辑 `HomePage.vue` 中的 `carouselSlides` 数组
- **替换头像/联系信息**：编辑 `AboutPage.vue`
- **调整氛围音**：编辑 `useAmbient.js` 中的 tracks 数组
- **修改高亮语言**：编辑 `markdown.js` 中 hljs.registerLanguage 部分
- **修改颜色/字体**：编辑 `variables.css`

## 部署

构建产物在 `dist/`，可直接部署到：
- GitHub Pages / Cloudflare Pages / Vercel / Netlify（拖拽上传）
- 任意 Nginx/Caddy 静态文件服务器
- SPA 需要配置 fallback：所有路由 → index.html
