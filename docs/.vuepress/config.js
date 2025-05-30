import { viteBundler } from '@vuepress/bundler-vite'
import { hopeTheme } from 'vuepress-theme-hope'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '我的个人博客',
  description: '记录技术学习与生活感悟',
 // base: '/Hanekawa-Blog/',
  base: '/',

  bundler: viteBundler(),
  
  theme: hopeTheme({
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

    // 贡献者
    contributors: false,

    // 主题配置
    darkmode: 'toggle', // 启用深色模式切换
    
    // 插件配置
    plugins: {
      // 评论插件配置
      comment: {
        provider: 'Giscus',
        repo: 'Hanekawa-00/Hanekawa-Blog',
        repoId: 'R_kgDOOyFkEg',
        category: 'Announcements',
        categoryId: 'DIC_kwDOOyFkEs4CqsWQ',
        mapping: 'pathname',
        reactionsEnabled: true,
        inputPosition: 'bottom',
        lang: 'zh-CN',
        theme: 'preferred_color_scheme',
        lazyLoading: true,
        crossorigin: 'anonymous',
      },
    },
    
    // Markdown 配置
    markdown: {
      gfm: true,
      vPre: true,
      tabs: true,
      codeTabs: true,
      align: true,
      attrs: true,
      sup: true,
      sub: true,
      footnote: true,
      mark: true,
      imgLazyload: true,
      imgSize: true,
      figure: true,
      tasklist: true,
    },
  }),

  // 插件配置已迁移到主题配置中
})
