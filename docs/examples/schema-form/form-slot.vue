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
      :rules="rules"
    >
      <template #id1-component="params">
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
import { reactive, ref } from 'vue'
import { ZZSchemaForm } from 'zz-components'
import type { SchemaFormInstance } from 'zz-components'

let columns = [
  {
    dataIndex: 'a',
    formItemProps: {
      label: '普通项',
    },
    initialValue: '上海',
    component: 'el-input',
  },
  {
    componentId: 'id1',
    dataIndex: 'b',
    formItemProps: {
      label: '自定义插槽',
    },
    initialValue: '上海',
    component: 'el-input',
  },
]

let form = ref<SchemaFormInstance | null>(null)
let rules = reactive({
  a: [{ required: true, message: '请输入', trigger: 'blur' }],
})
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

let mode = ref('create')
</script>
