<template>
  <div style="text-align: center">
    <ZZSchemaForm
      label-width="120px"
      ref="form"
      :columns="columns"
    ></ZZSchemaForm>
    <el-button type="primary" @click="onClick">输出表单值在控制台</el-button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ZZSchemaForm } from 'zz-components'
import type { SchemaFormInstance } from 'zz-components'

let columns = [
  {
    dataIndex: 'a',
    formItemProps: {
      label: '输入框',
    },
    component: 'el-input',
  },
  {
    dataIndex: ['startTime', 'endTime'],
    fieldProps: {
      type: 'datetimerange',
      'range-separator': 'To',
      'start-placeholder': 'Start date',
      'end-placeholder': 'End date',
    },
    formItemProps: {
      label: '时间范围选择框',
    },
    component: 'el-date-picker',
  },
]

let form = ref<SchemaFormInstance | null>(null)

let onClick = () => {
  let data = form.value.getFormData()
  console.log(data)
}
</script>
