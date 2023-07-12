<template>
  <div>
    <ZZSchemaForm :columns="columns"></ZZSchemaForm>
  </div>
</template>
<script setup>
import { ZZSchemaForm } from 'zz-components'

let columns = [
  {
    dataIndex: 'a',
    formItemProps: {
      label: '被依赖项',
    },
    component: 'el-input',
  },
  {
    dataIndex: 'b',
    fieldProps: {
      onChange: (params) => {
        if (params.getFieldValue('a') === 'disabled') {
          return {
            disabled: true,
          }
        }
        return {}
      },
    },
    formItemProps: {
      label: '依赖项',
      onChange: (params) => {
        return {
          label: params.getFieldValue('a'),
        }
      },
    },
    component: 'el-input',
  },
]
</script>
