import { computed } from 'vue'
import { useData } from 'vitepress'

import type { Ref } from 'vue'

export const useSourceCode = (path: Ref<string>) => {
  const { theme } = useData()

  const demoUrl = computed(() => {
    const {
      repo,
      docsDir = '',
      docsBranch = 'main',
      docsRepo = repo,
    } = theme.value

    return `https://github.com/mvm6523/zz-components/tree/main/docs/examples/${path.value}`
  })

  return demoUrl
}
