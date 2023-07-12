<template>
  <div style="text-align: center">
    <el-radio-group v-model="mode" style="margin-bottom: 10px">
      <el-radio-button label="readonly">只读模式</el-radio-button>
      <el-radio-button label="create">普通模式</el-radio-button>
    </el-radio-group>
    <ZZSchemaForm
      label-width="120px"
      ref="form"
      :columns="columns"
      :mode="mode"
    >
      <template #id1="params">
        <el-select v-bind="params" placeholder="选择框">
          <el-option label="上海" value="上海" />
          <el-option label="北京" value="北京" />
        </el-select>
      </template>
      <template #id1-readonly="params"> 值是{{ params.value }}</template>
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
    dataIndex: 'b',
    formItemProps: {
      label: '普通项',
    },
    initialValue: '上海',
    component: 'el-input',
  },
  {
    componentId: 'id1',
    dataIndex: 'a',
    formItemProps: {
      label: '自定义插槽',
    },
    initialValue: '上海',
    component: 'el-input',
  },
]

let form = ref<SchemaFormInstance | null>(null)

let onClick = () => {
  let data = form.value.getFormData()
  console.log(data)
}

let mode = ref('create')
</script>
