import type ConfigProvider from './configProvider.vue'
import type { ExtractPropTypes, PropType } from 'vue'
import { buildProps } from '@zz-components/utils'
import type { FormProps } from 'element-plus'

export type formConfig = Omit<FormProps, 'model'>

export const configProviderProps = buildProps({
  formConfig: {
    type: Object as PropType<formConfig>,
  },
} as const)
export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

export type ConfigProviderInstance = InstanceType<typeof ConfigProvider>
