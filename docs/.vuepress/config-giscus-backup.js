// Giscus 配置备份 - 从本地 config.js 提取的评论系统配置
// 可以在需要时重新添加到 config.js 中

import { commentPlugin } from '@vuepress/plugin-comment'

// 在 plugins 数组中添加以下配置：
const giscusConfig = commentPlugin({
  // 评论服务提供商，这里使用 Giscus
  provider: 'Giscus',
  
  // 以下配置需要用户在 GitHub 上设置 Giscus 后替换
  // 详细步骤：
  // 1. 访问 https://giscus.app/zh-CN
  // 2. 输入你的 GitHub 仓库信息
  // 3. 选择页面 ↔️ discussion 映射关系
  // 4. 选择 Discussion 分类
  // 5. 复制生成的配置信息替换下面的占位符
  
  // GitHub 仓库地址，格式：用户名/仓库名
  repo: 'your-username/your-repo-name',
  
  // 仓库 ID，从 Giscus 配置页面获取
  repoId: 'your-repo-id',
  
  // Discussion 分类名称，推荐使用 'Announcements'
  category: 'Announcements',
  
  // Discussion 分类 ID，从 Giscus 配置页面获取
  categoryId: 'your-category-id',
  
  // 页面 ↔️ discussion 映射关系
  // 'pathname' - 根据页面路径映射
  // 'url' - 根据页面 URL 映射
  // 'title' - 根据页面标题映射
  mapping: 'pathname',
  
  // 反应标签是否启用
  reactionsEnabled: true,
  
  // 输入框位置
  // 'top' - 评论框在评论上方
  // 'bottom' - 评论框在评论下方
  inputPosition: 'bottom',
  
  // 语言设置
  lang: 'zh-CN',
  
  // 主题模式
  // 'light' - 浅色主题
  // 'dark' - 深色主题
  // 'preferred_color_scheme' - 跟随系统主题
  // 'transparent_dark' - 透明深色主题
  theme: 'preferred_color_scheme',
  
  // 是否启用懒加载
  lazyLoading: true,
  
  // 评论区域宽度
  crossorigin: 'anonymous',
});

export default giscusConfig;