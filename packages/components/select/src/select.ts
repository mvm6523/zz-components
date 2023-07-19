import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@zz-components/utils'
import { UPDATE_MODEL_EVENT } from '@zz-components/constants'

export const selectProps = buildProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [Number, String, Boolean],
    required: false,
  },
} as const)
export type SelectProps = ExtractPropTypes<typeof selectProps>

export const selectEmits = {
  [UPDATE_MODEL_EVENT]: (value: unknown) => true,
}

export type SelectEmits = typeof selectEmits
