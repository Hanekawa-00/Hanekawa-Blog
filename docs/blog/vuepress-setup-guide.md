---
title: VuePress 博客搭建指南
date: 2024-05-29
author: 博主
tags: ['VuePress', '教程', '博客']
description: 详细介绍如何搭建一个功能完整的VuePress博客
---

# VuePress 博客搭建指南

本文将详细介绍如何从零开始搭建一个功能完整的VuePress博客。

## 环境准备

在开始之前，请确保你的开发环境已经安装了以下工具：

- Node.js (版本 16 或更高)
- npm 或 yarn 包管理器
- Git 版本控制工具

## 初始化项目

### 1. 创建项目目录

```bash
mkdir my-vuepress-blog
cd my-vuepress-blog
npm init -y
```

### 2. 安装VuePress

```bash
npm install -D vuepress@next @vuepress/bundler-vite @vuepress/theme-default
```

### 3. 创建目录结构

```
my-vuepress-blog/
├── docs/
│   ├── .vuepress/
│   │   └── config.js
│   ├── blog/
│   │   └── README.md
│   └── index.md
└── package.json
```

## 配置文件

### config.js 基础配置

```javascript
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '我的博客',
  description: '记录学习与生活',
  
  bundler: viteBundler(),
  
  theme: defaultTheme({
    navbar: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog/' },
    ],
    sidebar: {
      '/blog/': [
        {
          text: '博客文章',
          children: [],
        },
      ],
    },
  }),
})
```

## 自动化脚本

为了简化文章管理，我们开发了自动化脚本来处理侧边栏配置的更新。

### 脚本功能

- 自动扫描博客目录
- 解析文章的 frontmatter
- 按日期排序文章
- 更新侧边栏配置

### 使用方法

```bash
npm run update-blog
```

## 部署配置

### GitHub Pages 部署

1. 创建 GitHub 仓库
2. 配置 GitHub Actions
3. 设置自动部署流程

## 总结

通过这套配置，我们实现了：

- ✅ 自动化文章管理
- ✅ 响应式主题设计
- ✅ 自动部署流程
- ✅ SEO 优化配置

这样就完成了一个功能完整的VuePress博客搭建！