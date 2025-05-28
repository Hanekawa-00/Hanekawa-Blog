# VuePress 个人博客

这是一个使用 VuePress 搭建的个人博客站点，部署在 GitHub Pages 上。

## 功能特性

- 📝 **Markdown 写作**：使用 Markdown 编写博客文章
- 🎨 **响应式设计**：适配各种设备屏幕
- ⚡ **高性能**：静态站点生成，加载速度快
- 🔍 **搜索功能**：支持全站内容搜索
- 💬 **评论系统**：集成评论功能
- 🚀 **自动部署**：GitHub Actions 自动部署到 GitHub Pages

## 技术栈

- [VuePress](https://vuepress.vuejs.org/) - 静态站点生成器
- [Vue.js](https://vuejs.org/) - 前端框架
- [Vite](https://vitejs.dev/) - 构建工具
- [GitHub Pages](https://pages.github.com/) - 静态站点托管
- [GitHub Actions](https://github.com/features/actions) - CI/CD 自动化

## 项目结构

```
├── docs/                     # 文档目录
│   ├── .vuepress/           # VuePress 配置目录
│   │   ├── config.js        # 主配置文件
│   │   └── public/          # 静态资源目录
│   ├── blog/                # 博客文章目录
│   ├── about/               # 关于页面
│   └── index.md             # 首页
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions 部署配置
├── package.json             # 项目依赖配置
└── README.md               # 项目说明文件
```

## 本地开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run docs:dev
```

访问 `http://localhost:8080` 查看站点。

### 构建生产版本

```bash
npm run docs:build
```

构建后的文件将生成在 `docs/.vuepress/dist` 目录中。

## 部署

本项目使用 GitHub Actions 自动部署到 GitHub Pages。

### 部署步骤

1. **创建 GitHub 仓库**：将代码推送到 GitHub 仓库
2. **启用 GitHub Pages**：在仓库设置中启用 GitHub Pages，选择 "GitHub Actions" 作为部署源
3. **自动部署**：每次推送到 `main` 分支时，GitHub Actions 会自动构建和部署

### 配置说明

- GitHub Actions 配置文件：`.github/workflows/deploy.yml`
- 站点基础路径：在 `docs/.vuepress/config.js` 中配置 `base` 字段
- 部署目标：GitHub Pages

## 自定义配置

### 修改站点信息

编辑 `docs/.vuepress/config.js` 文件：

```javascript
export default defineUserConfig({
  title: '你的博客标题',
  description: '你的博客描述',
  base: '/your-repo-name/',
  // 其他配置...
})
```

### 添加新文章

1. 在 `docs/blog/` 目录下创建新的 Markdown 文件
2. 在文件头部添加 frontmatter：

```markdown
---
title: 文章标题
date: 2025-05-28
categories:
  - 分类名称
tags:
  - 标签1
  - 标签2
---

# 文章内容

文章正文内容...
```

3. 更新 `docs/.vuepress/config.js` 中的侧边栏配置

## 许可证

本项目采用 [MIT License](LICENSE) 许可证。

## 贡献

欢迎提交 Issue 和 Pull Request！

---

如果你觉得这个项目对你有帮助，请给个 ⭐ 支持一下！