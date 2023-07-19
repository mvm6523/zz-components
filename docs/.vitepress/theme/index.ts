import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import './styles/vars.css'
import { globals } from '../vitepress'
import 'element-plus/dist/index.css'
import './styles/global.scss'
import ElementPlus from 'element-plus'
import * as icons from '@ant-design/icons-vue'
import zzComponents from 'zz-components'
import { define } from '../utils/types'

export default define({
  extends: DefaultTheme,
  // Layout() {
  //   return h(DefaultTheme.Layout, null, {
  //     'not-found': () => h(NotFound),
  //   })
  // },
  enhanceApp(ctx: EnhanceAppContext) {
    const { app } = ctx
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
    app.use(ElementPlus)
    app.use(zzComponents)
    for (const [key, component] of Object.entries(icons)) {
      app.component(key, component)
    }
  },
})
