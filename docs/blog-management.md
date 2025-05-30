# 博客管理自动化脚本使用说明

本文档介绍如何使用自动化脚本来管理VuePress博客的文章和侧边栏配置。

## 概述

为了简化博客文章的管理，我们创建了一个自动化脚本 `scripts/update-blog.js`，它可以：

- 自动扫描 `docs/blog/` 目录下的所有 `.md` 文件
- 解析文章的 frontmatter 信息
- 按照日期倒序自动更新侧边栏配置
- 支持中文文章标题和日期格式

## 如何添加新文章

### 1. 创建新的Markdown文件

在 `docs/blog/` 目录下创建新的 `.md` 文件，文件名建议使用有意义的英文名称，例如：

```
docs/blog/my-first-post.md
docs/blog/vue-learning-notes.md
docs/blog/javascript-tips.md
```

### 2. 添加Frontmatter

在文章开头添加 frontmatter 来定义文章的元信息：

```markdown
---
title: 我的第一篇博客文章
date: 2023-12-01
author: 作者姓名
tags: ['Vue', '学习笔记']
description: 这是文章的简短描述
---

# 文章标题

这里是文章内容...
```

#### Frontmatter 字段说明

- `title`: 文章标题（必需）- 将显示在侧边栏中
- `date`: 发布日期（可选）- 用于排序，格式：YYYY-MM-DD
- `author`: 作者（可选）
- `tags`: 标签数组（可选）
- `description`: 文章描述（可选）

### 3. 运行自动更新脚本

添加文章后，运行以下命令来自动更新侧边栏配置：

```bash
npm run update-blog
```

## 脚本功能详解

### 自动扫描

脚本会自动扫描 `docs/blog/` 目录下的所有 `.md` 文件，并排除 `README.md` 文件。

### 智能排序

文章按照以下规则排序：
1. 优先使用 frontmatter 中的 `date` 字段
2. 如果没有 `date` 字段，使用文件的创建时间
3. 按照日期倒序排列（最新的文章在最上面）

### 标题解析

文章标题按照以下优先级获取：
1. frontmatter 中的 `title` 字段
2. frontmatter 中的 `name` 字段
3. 文件名（去掉 .md 扩展名，将 `-` 和 `_` 替换为空格）

### 配置更新

脚本会自动更新 `docs/.vuepress/config.js` 文件中的侧边栏配置，无需手动修改。

## 示例工作流程

1. **写新文章**：
   ```bash
   # 创建新文章
   touch docs/blog/vue3-composition-api.md
   ```

2. **编辑文章内容**：
   ```markdown
   ---
   title: Vue 3 Composition API 学习笔记
   date: 2023-12-15
   tags: ['Vue3', 'Composition API']
   ---
   
   # Vue 3 Composition API 学习笔记
   
   今天学习了 Vue 3 的 Composition API...
   ```

3. **更新配置**：
   ```bash
   npm run update-blog
   ```

4. **启动开发服务器**：
   ```bash
   npm run docs:dev
   ```

## 注意事项

1. **文件命名**：建议使用英文文件名，避免特殊字符
2. **Frontmatter 格式**：确保 frontmatter 使用正确的 YAML 格式
3. **日期格式**：日期使用 `YYYY-MM-DD` 格式，例如：`2023-12-01`
4. **编码格式**：确保文件使用 UTF-8 编码
5. **定期更新**：每次添加新文章后记得运行 `npm run update-blog`

## 故障排除

### 脚本运行失败

如果脚本运行失败，请检查：
- 文件的 frontmatter 格式是否正确
- 是否存在语法错误的 Markdown 文件
- 文件编码是否为 UTF-8

### 文章没有显示

如果文章没有在侧边栏显示：
- 确认文件在 `docs/blog/` 目录下
- 确认文件扩展名为 `.md`
- 确认文件不是 `README.md`
- 重新运行 `npm run update-blog`

### 排序不正确

如果文章排序不正确：
- 检查 frontmatter 中的 `date` 字段格式
- 确保日期格式为 `YYYY-MM-DD`
- 重新运行 `npm run update-blog`

## 扩展功能

未来可以考虑添加的功能：
- 支持分类和标签过滤
- 支持文章摘要自动提取
- 支持多语言文章
- 支持文章模板生成

## 技术实现

脚本使用 Node.js 编写，主要功能包括：
- 文件系统操作
- Frontmatter 解析
- 配置文件更新
- 错误处理和日志输出

如需了解更多技术细节，请查看 `scripts/update-blog.js` 文件。