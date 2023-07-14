<template>
  <el-form
    ref="elForm"
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
      <ZZField :mode="mode" v-bind="item" @[changeName]="setFieldValue">
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
import type { CustomRequired, Arrayable } from '@zz-components/utils'
import { UPDATE_MODEL_EVENT } from '@zz-components/constants'
import { formContextKey } from './constants'
import _ from 'lodash-es'
import type { FormItemProp } from 'element-plus'

let changeName = UPDATE_MODEL_EVENT

const COMPONENT_NAME = 'ZZSchemaForm'
defineOptions({
  name: COMPONENT_NAME,
})

let elForm = ref<any>(null)

// 默认的表单配置项
let formConfig = inject(FORM_CONFIG_KEY, {})

let { mode, columns, formData } = defineProps(schemaFormProps)
const emit = defineEmits(schemaFormEmits)

let innerFormData = ref({})

// 表单项值变更方法
const setFieldValue: FieldChange = function (key, value) {
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
      setFieldValue(column.dataIndex, _.cloneDeep(column.initialValue))
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
let getFieldsValue = (keys?: string[]) => {
  let data = innerFormData.value
  if (keys) {
    data = _.pick(innerFormData.value, keys)
  }
  return _.cloneDeep(data)
}
// 获取单个表单项的值
let getFieldValue = (key: string) => {
  return _.cloneDeep(innerFormData.value[key])
}

/** 获取格式化后的所有数据  */
let getFieldsFormatValue = (keys?: string[]) => {
  let data = {}
  let _keys = keys || []
  if (!keys) {
    columns.forEach((column) => {
      if (Array.isArray(column.dataIndex)) {
        _keys.concat(column.dataIndex)
      } else {
        _keys.push(column.dataIndex)
      }
    })
  }
  _keys.forEach((key) => {
    data[key] = getFieldFormatValue(key)
  })
  return _.cloneDeep(data)
}

/** 获取格式化之后的单个数据 */
let getFieldFormatValue = (key: string) => {
  for (let i = 0; i < columns.length; i++) {
    let column = columns[i]
    if (Array.isArray(column.dataIndex)) {
    } else {
      if (column.dataIndex === key) {
        if (column.transform) {
          return column.transform(innerFormData.value[key])
        } else {
          return innerFormData.value[key]
        }
      }
    }
  }
}

/** 验字段后返回格式化之后的所有数据*/
let validateFieldsReturnFormatValue = (key: Key) => {
  elForm.value && elForm.value
}

let resetFields = (props?: Arrayable<FormItemProp> | undefined) => {
  elForm.value && elForm.value.resetFields(props)
  // forFunc(columns, (item) => {
  //   if (item.data)
  // })
  // innerFormData.value
}
let scrollToField = (prop: FormItemProp) => {
  elForm.value && elForm.value.scrollToField(prop)
}
let clearValidate = (props?: Arrayable<FormItemProp> | undefined) => {
  elForm.value && elForm.value.clearValidate(props)
}

let forFunc = (data, cb) => {
  for (let i = 0; i < data.length; i++) {
    let item = data[i]
    cb(item, i)
  }
}

defineExpose({
  setFieldValue,
  getFieldsValue,
  getFieldValue,
  getFieldsFormatValue,
  getFieldFormatValue,
  resetFields,
  scrollToField,
  clearValidate,
  validateFieldsReturnFormatValue,
})
</script>
