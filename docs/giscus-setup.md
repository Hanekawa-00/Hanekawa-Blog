# Giscus 评论系统配置指南

## 什么是 Giscus？

Giscus 是一个基于 GitHub Discussions 的评论系统，它可以让你的博客读者通过 GitHub 账号进行评论和讨论。

## 配置步骤

### 1. 准备工作

确保你的 GitHub 仓库满足以下条件：
- 仓库是公开的
- 已启用 Discussions 功能
- 已安装 Giscus app

### 2. 启用 GitHub Discussions

1. 进入你的 GitHub 仓库
2. 点击 **Settings** 选项卡
3. 滚动到 **Features** 部分
4. 勾选 **Discussions** 复选框

### 3. 安装 Giscus App

1. 访问 [giscus app](https://github.com/apps/giscus)
2. 点击 **Install** 按钮
3. 选择要安装的仓库（可以选择所有仓库或特定仓库）
4. 授权安装

### 4. 获取配置信息

1. 访问 [https://giscus.app/zh-CN](https://giscus.app/zh-CN)
2. 在 **仓库** 字段中输入你的仓库地址，格式：`用户名/仓库名`
3. 选择 **页面 ↔️ discussion 映射关系**，推荐选择 `pathname`
4. 选择 **Discussion 分类**，推荐选择 `Announcements`
5. 页面会自动生成配置代码

### 5. 更新配置文件

复制生成的配置信息，替换 `docs/.vuepress/config.js` 文件中的占位符：

```javascript
// 将这些占位符替换为实际值
repo: 'your-username/your-repo-name',           // 改为你的仓库地址
repoId: 'your-repo-id',                         // 改为生成的仓库 ID
categoryId: 'your-category-id',                 // 改为生成的分类 ID
```

### 6. 配置示例

以下是一个完整的配置示例：

```javascript
commentPlugin({
  provider: 'Giscus',
  repo: 'username/my-blog',
  repoId: 'R_kgDOH1234567',
  category: 'Announcements',
  categoryId: 'DIC_kwDOH1234567',
  mapping: 'pathname',
  reactionsEnabled: true,
  inputPosition: 'bottom',
  lang: 'zh-CN',
  theme: 'preferred_color_scheme',
  lazyLoading: true,
  crossorigin: 'anonymous',
}),
```

### 7. 部署和测试

1. 保存配置文件
2. 运行 `npm run docs:build` 构建项目
3. 部署到 GitHub Pages
4. 访问博客文章页面，检查评论区是否正常显示

## 常见问题

### Q: 评论区没有显示怎么办？
A: 请检查：
1. GitHub 仓库是否为公开状态
2. Discussions 功能是否已启用
3. Giscus app 是否已正确安装
4. 配置参数是否正确

### Q: 如何修改评论区主题？
A: 在配置中修改 `theme` 参数：
- `'light'` - 浅色主题
- `'dark'` - 深色主题
- `'preferred_color_scheme'` - 跟随系统主题

### Q: 如何只在特定页面显示评论？
A: 可以在页面的 frontmatter 中添加：
```yaml
---
comment: false  # 禁用评论
---
```

## 更多自定义选项

Giscus 还支持更多自定义选项，详细信息请参考：
- [Giscus 官方文档](https://giscus.app/zh-CN)
- [VuePress 评论插件文档](https://ecosystem.vuejs.press/zh/plugins/blog/comment/)