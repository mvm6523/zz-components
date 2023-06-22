import type Button from './Button.vue'
import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@zz-components/utils'

export const affixProps = buildProps({} as const)
export type AffixProps = ExtractPropTypes<typeof affixProps>

export const buttonEmits = {}

export type AffixEmits = typeof buttonEmits

export type ButtonInstance = InstanceType<typeof Button>
