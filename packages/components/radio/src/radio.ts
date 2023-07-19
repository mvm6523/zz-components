import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@zz-components/utils'
import { UPDATE_MODEL_EVENT } from '@zz-components/constants'

export const radioProps = buildProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [Number, String, Boolean],
    required: false,
  },
} as const)
export type RadioProps = ExtractPropTypes<typeof radioProps>

export const radioEmits = {
  [UPDATE_MODEL_EVENT]: (value: unknown) => true,
}

export type RadioEmits = typeof radioEmits
