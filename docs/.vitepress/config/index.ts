import { defineConfig } from 'vitepress'
import { mdPlugin } from './plugins'
import sidebar from './sidebar'
import nav from './nav'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/zz-components/',
  title: 'ZZ Components',
  description: '基于VUE3和element plus的组件库',
  lastUpdated: true,
  lang: 'zh',
  head: [['link', { rel: 'icon', href: '/zz-components/images/drinks.svg' }]],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/images/drinks.svg',
    outline: {
      level: 'deep',
      label: '本页目录',
    },
    editLink: {
      pattern: 'https://github.com/mvm6523/zz-components/tree/main/docs/:path',
      text: '在github编辑此页',
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '取消',
            },
          },
        },
      },
    },
    nav,
    sidebar,
    lastUpdatedText: '上次更新',
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/mvm6523/zz-components' },
    ],
    returnToTopLabel: '回到顶部',
  },
  markdown: {
    config: (md: any) => mdPlugin(md),
  },
})
