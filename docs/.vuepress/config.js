import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { commentPlugin } from '@vuepress/plugin-comment'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '我的个人博客',
  description: '记录技术学习与生活感悟',
 // base: '/Hanekawa-Blog/',
  base: '/',

  bundler: viteBundler(),
  
  theme: defaultTheme({
    // 导航栏
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '博客',
        link: '/blog/',
      },
      {
        text: '关于',
        link: '/about/',
      },
      {
        text: 'GitHub',
        link: 'https://github.com',
      },
    ],

    // 侧边栏 - 将由自动化脚本更新
    sidebar: {
      '/blog/': [
        {
          text: '博客文章',
          children: [
            '/blog/welcome-to-my-blog.md',
            '/blog/vuepress-setup-guide.md',
          
          
          
          
          ],
        },
      ],
    },

    // 页面编辑链接
    editLink: false,
    
    // 最后更新时间
    lastUpdated: true,
    lastUpdatedText: '上次更新',

    // 贡献者
    contributors: false,

    // 页面滚动
    smoothScroll: true,
  }),

  // 插件配置
  plugins: [
    // Giscus 评论系统配置
    // 详细配置步骤：
    // 1. 访问 https://giscus.app/zh-CN
    // 2. 输入你的 GitHub 仓库信息（需要是公开仓库）
    // 3. 在仓库设置中启用 Discussions 功能
    // 4. 选择页面 ↔️ discussion 映射关系
    // 5. 选择 Discussion 分类（推荐使用 'Announcements'）
    // 6. 复制生成的配置信息替换下面的占位符
    commentPlugin({
      // 评论服务提供商，这里使用 Giscus
      provider: 'Giscus',
      
      // Giscus 配置需要嵌套在 comment 对象中
      comment: {
        // GitHub 仓库地址，格式：用户名/仓库名
        repo: 'Hanekawa-00/Hanekawa-Blog',
        
        // 仓库 ID，从 Giscus 配置页面获取
        repoId: 'R_kgDOOyFkEg',
        
        // Discussion 分类名称，推荐使用 'Announcements'
        category: 'Announcements',
        
        // Discussion 分类 ID，从 Giscus 配置页面获取
        categoryId: 'DIC_kwDOOyFkEs4CqsWQ',
        
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
        
        // 评论区域设置
        crossorigin: 'anonymous',
      }
    }),
    
    // 搜索插件暂时移除，稍后重新配置
  ],
})
