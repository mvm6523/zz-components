import { withInstall } from '@zz-components/utils'

import ConfigProvider from './src/configProvider.vue'

export const ZZConfigProvider = withInstall(ConfigProvider)
export default ZZConfigProvider

export * from './src/configProvider'
