<template>
  <el-transfer
    v-bind="$attrs"
    :data="options"
    :modelValue="modelValue"
    @change="change"
  >
    <template #left-footer>
      <slot name="left-footer"></slot>
    </template>
    <template #right-footer>
      <slot name="right-footer"></slot>
    </template>
    <template #default="{ option }" v-if="haveDefault">
      <slot :option="option" />
    </template>
  </el-transfer>
</template>
<script setup lang="ts">
import { transferProps, transferEmits } from './transfer'
import { UPDATE_MODEL_EVENT } from '@zz-components/constants'
import { useSlots } from 'vue'

const COMPONENT_NAME = 'ZZTransfer'
defineOptions({
  name: COMPONENT_NAME,
})

let { options, modelValue } = defineProps(transferProps)
const emit = defineEmits(transferEmits)
const changeName = UPDATE_MODEL_EVENT

let change = (value) => {
  emit(changeName, value)
}
let slots = useSlots()
let haveDefault = slots.default && slots.default()[0].children !== 'v-if'
</script>
