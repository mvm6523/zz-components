<template>
  <div>
    <ZZSchemaForm label-width="100px" :columns="columns"></ZZSchemaForm>
  </div>
</template>
<script setup>
import { ZZSchemaForm } from 'zz-components'

let columns = [
  {
    dataIndex: 'a',
    fieldProps: {
      onChange: (params) => {
        return {
          style: {
            '--el-input-bg-color': params.getFieldValue('a'),
          },
        }
      },
    },
    formItemProps: {
      label: '改变自身颜色',
    },
    component: 'el-input',
  },
]
</script>
