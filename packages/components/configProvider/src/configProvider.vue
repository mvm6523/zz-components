<template>
  <slot></slot>
</template>
<script setup lang="ts">
import { provide } from 'vue'
import { configProviderProps } from './configProvider'
import { FORM_CONFIG_KEY } from '@zz-components/constants'

const COMPONENT_NAME = 'ZZConfigProvider'
defineOptions({
  name: COMPONENT_NAME,
})
let { formConfig } = defineProps(configProviderProps)

provide(FORM_CONFIG_KEY, formConfig)
</script>
