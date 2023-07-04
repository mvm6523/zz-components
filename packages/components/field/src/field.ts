import type Field from './field.vue'
import type { ExtractPropTypes, PropType } from 'vue'
import { buildProps } from '@zz-components/utils'
import { isString } from '@vue/shared'
import { UPDATE_MODEL_EVENT } from '@zz-components/constants'

export type componentMode = 'readonly' | 'create' | 'update'

export type configProps = {
  valueEnum?: {
    label: string
    value: unknown
  }
}

export type fieldProps = {}
export type formItemProps = {}

interface zzFieldProps {
  mode: componentMode
  config: configProps
  fieldProps: fieldProps
  formItemProps: formItemProps
}

export const fieldProps = buildProps({
  /**
   * @description 表单项模式
   */
  mode: {
    type: String as PropType<zzFieldProps['mode']>,
    required: true,
  },
  /**
   * @description 表单项的值
   */
  config: {
    type: Object as PropType<zzFieldProps['config']>,
    required: true,
  },
} as const)
export type FieldEmits = typeof fieldEmits

export type fieldInstance = InstanceType<typeof Field>

export type FieldProps = ExtractPropTypes<typeof fieldProps>

export const fieldEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
}

