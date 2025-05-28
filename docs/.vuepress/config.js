import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '我的个人博客',
  description: '记录技术学习与生活感悟',
  base: '/Hanekawa-Blog/',

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

    // 侧边栏
    sidebar: {
      '/blog/': [
        {
          text: '博客文章',
          children: [
            '/blog/article1.md',
            '/blog/article2.md',
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
    // 搜索插件暂时移除，稍后重新配置
  ],
})