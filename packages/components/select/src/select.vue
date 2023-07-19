<template>
  <el-select v-bind="$attrs" :modelValue="modelValue" @change="change">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <slot />
    </el-option>
  </el-select>
</template>
<script setup lang="ts">
import { selectProps, selectEmits } from './select'
import { UPDATE_MODEL_EVENT } from '@zz-components/constants'

const COMPONENT_NAME = 'ZZSelect'
defineOptions({
  name: COMPONENT_NAME,
})

let { options, modelValue } = defineProps(selectProps)
const emit = defineEmits(selectEmits)
const changeName = UPDATE_MODEL_EVENT

let change = (value) => {
  emit(changeName, value)
}
</script>
