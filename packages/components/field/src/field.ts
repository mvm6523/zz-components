import type Field from './field.vue'
import type { ExtractPropTypes, PropType } from 'vue'
import { buildProps } from '@zz-components/utils'
import { isString } from '@vue/shared'
import { UPDATE_MODEL_EVENT } from '@zz-components/constants'
import type { FormItemProps } from 'element-plus'
import type { componentMode } from '../../form'
import type { Params, Key } from '../../form'

type anyObject = {
  [k: string]: unknown
}

export type FieldPropsType = {
  onChange?: (params: Params) => anyObject
} & anyObject

export interface Request {
  (...arg): unknown[]
}

export interface zzFieldProps {
  dataIndex: Key
  mode?: componentMode
  valueEnum?:
    | {
        label: string
        value: unknown
      }[]
    | boolean[]
    | string[]
  fieldProps?: FieldPropsType
  formItemProps?: Omit<FormItemProps, 'label' | 'prop'> & {
    onChange?: (params: Params) => anyObject
  }
  request?: Request
  componentId: string
  component: string
  initialValue: unknown
  params: object
  convertValue: (val: unknown) => any
}

export const fieldProps = buildProps({
  /**
   * @description 表单值的key
   */
  dataIndex: {
    type: [String, Array] as PropType<zzFieldProps['dataIndex']>,
    required: true,
  },
  /**
   * @description 表单项初始值
   */
  initialValue: {
    type: [Object, String, Array, Number, Boolean, Date] as PropType<unknown>,
    required: false,
    default: null,
  },
  /**
   * @description 表单项模式  优先级高于form
   */
  mode: {
    type: String as PropType<zzFieldProps['mode']>,
    required: true,
  },
  /**
   * @description 表单项值的枚举
   */
  valueEnum: {
    type: Array as PropType<zzFieldProps['valueEnum']>,
    required: false,
  },
  /**
   * @description 表单原子组件的参数和其变化方法
   */
  fieldProps: {
    type: Object as PropType<zzFieldProps['fieldProps']>,
    required: false,
  },
  /**
   * @description 表单校验项的参数和其变化方法
   */
  formItemProps: {
    type: Object as PropType<zzFieldProps['formItemProps']>,
    required: false,
  },
  /**
   * @description 将渲染的组件
   */
  component: {
    type: String,
    required: true,
  },
  componentId: {
    type: String,
    required: true,
  },
  /**
   * @description 发生在组件获得数据之前，一般是后端直接给前端的数据，有时需要精加工一下
   */
  convertValue: {
    type: Function as PropType<zzFieldProps['convertValue']>,
    required: false,
    default: null,
  },
  /**
   * @description 发生在提交的时候，一般来说都是吐给后端的存在数据库里的数据
   */
  transform: {
    type: Function as PropType<zzFieldProps['convertValue']>,
    required: false,
    default: null,
  },
  /**
   * @description 网络请求的参数，修改会触发请求
   */
  params: {
    type: Object,
    required: false,
    default: null,
  },
  request: {
    type: Function as PropType<zzFieldProps['request']>,
    required: false,
    default: null,
  },
} as const)
export type FieldEmits = typeof fieldEmits

export type fieldInstance = InstanceType<typeof Field>

export type FieldProps = ExtractPropTypes<typeof fieldProps>

export const fieldEmits = {
  [UPDATE_MODEL_EVENT]: (key: Key, value: unknown) => isString(value),
}
