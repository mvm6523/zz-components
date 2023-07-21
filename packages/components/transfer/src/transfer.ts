import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@zz-components/utils'
import { UPDATE_MODEL_EVENT } from '@zz-components/constants'

export const transferProps = buildProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Array,
    required: false,
  },
} as const)
export type TransferProps = ExtractPropTypes<typeof transferProps>

export const transferEmits = {
  [UPDATE_MODEL_EVENT]: (value: unknown) => true,
}

export type TransferEmits = typeof transferEmits
