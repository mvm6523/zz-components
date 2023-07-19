import { withInstall } from '@zz-components/utils'

import Radio from './src/radio.vue'
import RadioBtn from './src/radio-btn.vue'

export const ZZRadio = withInstall(Radio)
export const ZZRadioBtn = withInstall(RadioBtn)
export default ZZRadio

export * from './src/radio'
