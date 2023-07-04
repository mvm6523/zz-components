<template>
  <div v-show="mode === 'readonly'">
    {{ getReadValue() }}
  </div>
  <div v-if="firstRender" v-show="mode === 'create' || mode === 'update'">
    <component></component>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { fieldProps, fieldEmits } from './field.vue'
import { UPDATE_MODEL_EVENT } from '@zz-components/constants'

const COMPONENT_NAME = 'ZZField'
defineOptions({
  name: COMPONENT_NAME,
})
let { mode, config } = defineProps(fieldProps)
const emit = defineEmits(fieldEmits)

let value = null
/**
 * @description 获取只读模式时要显示的值
 */
let getReadValue = () => {
  if (config.valueEnum) {
    return config.valueEnum.find((item) => item.value === value)?.label
  }
  return value
}

// 是否进行初次渲染
let firstRender = ref(false)

/**
 * @description 只检测到mode不为read时，此时允许动态组件渲染
 */
let stopModeWatch = watch(
  () => mode,
  (value) => {
    if (value !== 'readonly') {
      firstRender.value = true
      stopModeWatch()
    }
  },
  {
    immediate: true,
  }
)
</script>
