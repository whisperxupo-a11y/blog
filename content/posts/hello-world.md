---
title: 你好，世界
date: 2026-05-21
summary: 第一篇博客，记录搭建这个轻量级博客的过程与想法。
tags:
  - 博客
  - Vue
---

## 为什么写博客

我一直想要一个**真正轻量**的写作空间。没有复杂的管理后台，没有数据库依赖，只需打开编辑器写 Markdown，然后一键构建发布。

## 技术选型

这个博客用到了几个简单而可靠的工具：

- **Vue 3** — 渐进式 JavaScript 框架，组件化开发
- **Vite** — 极速的前端构建工具
- **markdown-it** — 高性能 Markdown 解析器
- **highlight.js** — 代码语法高亮

### 为什么不用更流行的方案？

Hexo、Hugo 都很优秀，但我想自己掌控每个像素。Vue 的生态让我可以在需要时随时扩展新功能。

## 代码示例

```javascript
// 一个简单的问候
function greet(name) {
  return `你好，${name}！`
}

console.log(greet('世界'))
```

```python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

print(list(fibonacci(10)))
```

## 写在最后

> 写作是思考的延续。

希望这个小小的空间能让更多的想法落地。欢迎常来看看。
