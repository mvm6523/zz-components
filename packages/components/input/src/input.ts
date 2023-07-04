import type Input from './input.vue'
import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@zz-components/utils'
import { isString } from '@vue/shared'
import { UPDATE_MODEL_EVENT } from '@zz-components/constants'

export const inputProps = buildProps({
  /**
   * @description 表单项模式
   */
  mode: {
    type: String,
    required: true,
  },
  /**
   * @description 表单项的值
   */
  value: {
    type: [String, Number],
    required: false,
    default: null,
  },
} as const)
export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
}

export type InputEmits = typeof inputEmits

export type inputInstance = InstanceType<typeof Input>
