<template>
  <ZZSchemaForm label-width="120px" ref="form" :columns="columns">
    <template #transferId-left-footer>
      <el-button>底部按钮</el-button>
    </template>
  </ZZSchemaForm>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ZZSchemaForm } from 'zz-components'
import type { Columns } from 'zz-components'

let columns = ref<Columns>([
  {
    dataIndex: 'selectValue',
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
    params: {
      a: 1,
    },
    request: ({ params, keyword }) => {
      console.log(params)
      console.log(keyword)
      let arr = []
      for (let i = 0; i < 10; i++) {
        let obj = {
          label: keyword + i,
          value: i,
        }
        arr.push(obj)
      }
      return arr
    },
    component: 'select',
  },
  {
    dataIndex: 'selectValue2',
    formItemProps: {
      label: '单选框2',
    },
    request: ({ keyword }) => {
      let arr = []
      for (let i = 0; i < 10; i++) {
        let obj = {
          label: keyword + i,
          value: i,
        }
        arr.push(obj)
      }
      return new Promise((resolve) => {
        resolve(arr)
      })
    },
    component: 'select',
  },
])

setTimeout(() => {
  columns.value[0].params.a = 2
}, 2000)
</script>
