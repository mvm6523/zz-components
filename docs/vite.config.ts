import { MarkdownTransform } from './.vitepress/plugins/markdown-transform'
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path, { resolve } from 'path'
import type { Alias } from 'vite'

export const projRoot = resolve(__dirname, '..')
console.log(__dirname)
console.log(projRoot)

const alias: Alias[] = [
  {
    find: '~/',
    replacement: `${path.resolve(__dirname, './.vitepress/vitepress')}/`,
  },
  {
    find: 'packages/',
    replacement: path.resolve(projRoot, './'),
  },
  {
    find: /^zz-components/,
    replacement: path.resolve(projRoot, 'packages/zz-components/index.ts'),
  },
]

export default defineConfig({
  resolve: { alias },
  plugins: [vueJsx(), MarkdownTransform()],
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
})
