<template>
  <div style="text-align: center">
    <ZZSchemaForm label-width="120px" ref="form" :columns="columns">
      <template #transferId-left-footer>
        <el-button>底部按钮</el-button>
      </template>
    </ZZSchemaForm>
    <el-button type="primary" @click="onClick">输出表单值在控制台</el-button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ZZSchemaForm } from 'zz-components'
import type { SchemaFormInstance } from 'zz-components'

let columns = [
  {
    dataIndex: 'inputValue',
    formItemProps: {
      label: '输入框',
    },
    component: 'input',
  },
  {
    dataIndex: 'radioValue',
    fieldProps: {
      options: [
        {
          label: 'Option A',
          value: '1',
        },
        {
          label: 'Option B',
          value: '2',
        },
      ],
    },
    formItemProps: {
      label: '单选框',
    },
    component: 'radio',
  },
  {
    dataIndex: 'radioValue',
    fieldProps: {
      options: [
        {
          label: 'Option A',
          value: '1',
        },
        {
          label: 'Option B',
          value: '2',
        },
      ],
    },
    formItemProps: {
      label: '单选框按钮',
    },
    component: 'radioButton',
  },
  {
    dataIndex: 'select',
    fieldProps: {
      options: [
        {
          label: 'Option A',
          value: '1',
        },
        {
          label: 'Option B',
          value: '2',
        },
      ],
    },
    formItemProps: {
      label: '选择框',
    },
    component: 'select',
  },
  {
    dataIndex: 'transfer',
    componentId: 'transferId',
    fieldProps: {
      options: [
        {
          label: 'OptionA',
          key: 1,
          disabled: false,
        },
        {
          label: 'OptionB',
          key: 2,
          disabled: false,
        },
      ],
    },
    formItemProps: {
      label: '穿梭框',
    },
    component: 'transfer',
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
  let promise = form.value.validateFieldsReturnFormatValue()
  promise
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
      console.log(e)
    })
}
</script>
