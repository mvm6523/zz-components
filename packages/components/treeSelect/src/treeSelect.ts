import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@zz-components/utils'
import { UPDATE_MODEL_EVENT } from '@zz-components/constants'

export const treeSelectProps = buildProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [Number, String, Boolean],
    required: false,
  },
} as const)
export type TreeSelectProps = ExtractPropTypes<typeof treeSelectProps>

export const treeSelectEmits = {
  [UPDATE_MODEL_EVENT]: (value: unknown) => true,
}

export type TreeSelectEmits = typeof treeSelectEmits
