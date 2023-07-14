<template>
  <el-form
    label-width="80px"
    v-bind="{ ...formConfig, ...$attrs }"
    :model="innerFormData"
  >
    <template
      v-for="item in innerColumns.filter(
        (column) => showMap.get(column.componentId) === 'display'
      )"
      :key="item.dataIndex.toString() + showMap.get(item.componentId)"
    >
      <ZZField :mode="mode" v-bind="item" @[changeName]="fieldChange">
        <template #readonly="params">
          <slot :name="item.componentId + '-readonly'" v-bind="params" />
        </template>
        <template #default="params">
          <slot :name="item.componentId" v-bind="params" />
        </template>
      </ZZField>
    </template>
  </el-form>
</template>
<script setup lang="ts">
import { provide, inject, ref, toRaw, computed } from 'vue'
import type { FieldChange, Key, ShowType } from './schema-form'
import { schemaFormProps, schemaFormEmits } from './schema-form'
import { FORM_CONFIG_KEY } from '@zz-components/constants'
import ZZField from '../../field'
import type { zzFieldProps } from '@/components/field'
import type { CustomRequired } from '@zz-components/utils'
import { UPDATE_MODEL_EVENT } from '@zz-components/constants'
import { formContextKey } from './constants'
import _ from 'lodash-es'

let changeName = UPDATE_MODEL_EVENT

const COMPONENT_NAME = 'ZZSchemaForm'
defineOptions({
  name: COMPONENT_NAME,
})

let readonly = 'readonly'

// 默认的表单配置项
let formConfig = inject(FORM_CONFIG_KEY, {})

let { mode, columns, formData } = defineProps(schemaFormProps)
const emit = defineEmits(schemaFormEmits)

let innerFormData = ref({})

// 表单项值变更方法
const fieldChange: FieldChange = function (key, value) {
  if (Array.isArray(key)) {
    try {
      for (const i in key) {
        innerFormData.value[key[i]] = (value as object)[i]
      }
    } catch (e) {
      console.error('value 数据类型应为数组类型')
    }
  } else {
    innerFormData.value[key] = value
  }
}

//   设置初始值
if (formData) {
  innerFormData.value = _.cloneDeep(formData)
} else {
  columns.forEach((column) => {
    if (column.initialValue) {
      fieldChange(column.dataIndex, _.cloneDeep(column.initialValue))
    }
  })
}
provide(formContextKey, {
  formData: innerFormData,
})

type InnerColumns = CustomRequired<zzFieldProps, 'componentId'>[]
let innerColumns = computed<InnerColumns>(() => {
  return (columns as InnerColumns).map((column) => {
    if (!column.componentId) {
      column.componentId = getColumnId(column)
    }
    return column
  })
})

let getColumnId = (column) => {
  if (column.componentId) {
    return column.componentId
  }
  return column.component + column.dataIndex.toString()
}
let init = () => {
  innerFormData.value = toRaw(formData)
}

let showMap = ref<Map<string, ShowType>>(new Map())
for (let column of innerColumns.value) {
  showMap.value.set(getColumnId(column), 'display')
}

// 获取所有表单项的值
let getFormValue = () => {
  return _.cloneDeep(innerFormData.value)
}
// 获取单个表单项的值
let getFieldValue = (key: string) => {
  return _.cloneDeep(innerFormData.value[key])
}

defineExpose({
  fieldChange,
  getFormValue,
  getFieldValue,
})
</script>
