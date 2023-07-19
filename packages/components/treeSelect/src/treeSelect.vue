<template>
  <el-tree-select
    v-bind="$attrs"
    :data="options"
    :modelValue="modelValue"
    @change="change"
  >
    <slot />
  </el-tree-select>
</template>
<script setup lang="ts">
import { treeSelectProps, treeSelectEmits } from './treeSelect'
import { UPDATE_MODEL_EVENT } from '@zz-components/constants'

const COMPONENT_NAME = 'ZZTreeSelect'
defineOptions({
  name: COMPONENT_NAME,
})

let { options, modelValue } = defineProps(treeSelectProps)
const emit = defineEmits(treeSelectEmits)
const changeName = UPDATE_MODEL_EVENT

let change = (value) => {
  emit(changeName, value)
}
</script>
