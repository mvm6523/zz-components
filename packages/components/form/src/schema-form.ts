// @ts-ignore
import type SchemaForm from './schema-form.vue'
import type { ExtractPropTypes, PropType } from 'vue'
import { Arrayable, buildProps } from '@zz-components/utils'
import type { zzFieldProps } from '../../field'

export type ShowType = 'display' | 'hidden' | 'none'

export type Key = Arrayable<string>

export type FieldChange = (key: Key, value: unknown) => void

// export type FormValidateCallback = (key: Key) =>

export type Params = {
  setFieldValue: FieldChange
  getFieldValue: (key: string) => unknown
}

export type componentMode = 'readonly' | 'create' | 'update'

export type Columns = zzFieldProps[]

export const schemaFormProps = buildProps({
  /**
   * @description 表单项模式 优先级低于field
   */
  mode: {
    type: String as PropType<componentMode>,
    required: false,
    default: 'create',
  },
  /**
   * @description  列信息数组
   */
  columns: {
    type: Array as PropType<Columns>,
    required: true,
  },
  /**
   * @description  表单数据
   */
  formData: {
    type: Object,
    required: false,
    default: null,
  },
} as const)
export type SchemaFormProps = ExtractPropTypes<typeof schemaFormProps>

export const schemaFormEmits = {}

export type SchemaFormEmits = typeof schemaFormEmits

export type SchemaFormInstance = InstanceType<typeof SchemaForm>
