<template>
  <el-radio-group v-bind="$attrs" :modelValue="modelValue" @change="change">
    <el-radio :label="item.value" v-for="item in options" :key="item.value">
      {{ item.label }}
    </el-radio>
  </el-radio-group>
</template>
<script setup lang="ts">
import { radioProps, radioEmits } from './radio'
import { UPDATE_MODEL_EVENT } from '@zz-components/constants'

const COMPONENT_NAME = 'ZZRadio'
defineOptions({
  name: COMPONENT_NAME,
})

let { options, modelValue } = defineProps(radioProps)
const emit = defineEmits(radioEmits)
const changeName = UPDATE_MODEL_EVENT

let change = (value) => {
  emit(changeName, value)
}
</script>
