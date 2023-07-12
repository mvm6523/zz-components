import type Button from './button.vue'
import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@zz-components/utils'

export const buttonProps = buildProps({} as const)
export type ButtonProps = ExtractPropTypes<typeof buttonProps>

export const buttonEmits = {}

export type ButtonEmits = typeof buttonEmits

export type ButtonInstance = InstanceType<typeof Button>
