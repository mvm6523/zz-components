<template>
  <el-transfer
    v-bind="$attrs"
    :data="options"
    :modelValue="modelValue"
    @change="change"
  >
    <template
      v-for="itemSlot in Object.keys(slots)"
      :key="itemSlot"
      v-slot:[itemSlot]="temp"
    >
      <slot :name="itemSlot" v-bind="temp"></slot>
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
</script>
