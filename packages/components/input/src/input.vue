<template>
  <div v-if="mode === 'read'">
    {{ value }}
  </div>
  <div v-else-if="mode === 'create' || mode === 'update'">
    <el-input :modelValue="value" v-bind="$attrs" @change="valueChange" />
  </div>
</template>
<script setup lang="ts">
import { inputProps, inputEmits } from './input'
import { UPDATE_MODEL_EVENT } from '@zz-components/constants'

const COMPONENT_NAME = 'ZZInput'
defineOptions({
  name: COMPONENT_NAME,
})
let { mode, value } = defineProps(inputProps)
const emit = defineEmits(inputEmits)
let valueChange = (value: string) => {
  emit(UPDATE_MODEL_EVENT, value)
}
</script>
