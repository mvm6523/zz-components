<template>
  <el-form
    ref="formRef"
    label-width="80px"
    v-bind="{ ...formConfig, ...$attrs }"
    :model="innerFormData"
  >
    <template
      v-for="item in innerColumns.filter(
        (column) => showMap.get(column.componentId) !== 'none'
      )"
      :key="item.componentId"
    >
      <ZZField
        :mode="mode"
        :config="item"
        v-bind="item"
        @[changeName]="setFieldValue"
      >
        <template #readonly="params">
          <slot :name="item.componentId + '-readonly'" v-bind="params" />
        </template>
        <template #component="params">
          <slot :name="item.componentId + '-component'" v-bind="params" />
        </template>
        <template #default="params" v-if="slots[item.componentId]">
          <slot :name="item.componentId" v-bind="params" />
        </template>
      </ZZField>
    </template>
  </el-form>
</template>
<script setup lang="ts">
import {
  provide,
  inject,
  ref,
  toRaw,
  computed,
  watchEffect,
  useSlots,
} from 'vue'
import type { FieldChange, Key, ShowType } from './schema-form'
import { schemaFormProps, schemaFormEmits } from './schema-form'
import { FORM_CONFIG_KEY } from '@zz-components/constants'
import ZZField from '../../field'
import type { zzFieldProps } from '@/components/field'
import type { CustomRequired } from '@zz-components/utils'
import { UPDATE_MODEL_EVENT } from '@zz-components/constants'
import { formContextKey } from './constants'
import _ from 'lodash-es'
import type { FormItemProp, FormInstance } from 'element-plus'

const changeName = UPDATE_MODEL_EVENT

const COMPONENT_NAME = 'ZZSchemaForm'
defineOptions({
  name: COMPONENT_NAME,
})

let slots = useSlots()

let formRef = ref<FormInstance | null>(null)

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
      column.componentId = column.component + column.dataIndex.toString()
    }
    return column
  })
})

watchEffect(() => {
  innerFormData.value = toRaw(formData) || {}
})

let showMap = ref<Map<string, ShowType>>(new Map())
for (let column of innerColumns.value) {
  showMap.value.set(column.componentId, 'display')
}

// 以下为表单导出方法
/** 获取所有表单项的值  */
let getFieldsValue = (keys?: string[] | undefined) => {
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

/** 校验字段后返回格式化之后的所有数据*/
// let validateFieldsReturnFormatValue = (key: Key) => {
let validateFieldsReturnFormatValue = (key?: string | string[]) => {
  return new Promise(async (resolve, reject) => {
    if (formRef.value) {
      let cb = (valid, fields) => {
        if (valid) {
          let formatValue = {}
          innerColumns.value.forEach((column) => {
            if (column.transform) {
              if (Array.isArray(column.dataIndex)) {
                column.dataIndex.forEach((item) => {
                  formatValue[item] = column.transform!(
                    innerFormData.value[item]
                  )
                })
              } else {
                formatValue[column.dataIndex] = column.transform(
                  innerFormData.value[column.dataIndex]
                )
              }
            } else {
              if (Array.isArray(column.dataIndex)) {
                column.dataIndex.forEach((item) => {
                  formatValue[item] = innerFormData.value[item]
                })
              } else {
                formatValue[column.dataIndex] =
                  innerFormData.value[column.dataIndex]
              }
            }
          })
          resolve(formatValue)
        } else {
          console.error(fields)
          reject(undefined)
        }
      }
      if (key) {
        await formRef.value.validateField(key, cb)
      } else {
        await formRef.value.validate(cb)
      }
    } else {
      reject('表单实例还未创建')
    }
  })
}

let resetFields = (key?: Key | undefined) => {
  formRef.value && formRef.value.resetFields(key)
}
let scrollToField = (prop: FormItemProp) => {
  formRef.value && formRef.value.scrollToField(prop)
}
let clearValidate = (key?: Key | undefined) => {
  formRef.value && formRef.value.clearValidate(key)
}

/** 校验字段后返回格式化之前的所有数据*/
let validateField = (key?: Key | undefined): Promise<object | undefined> => {
  return new Promise(async (resolve, reject) => {
    if (formRef.value) {
      let cb = (valid, fields) => {
        if (valid) {
          if (Array.isArray(key)) {
            resolve(getFieldsValue(key))
          } else {
            resolve(getFieldValue(key as string))
          }
        } else {
          console.error(fields)
          reject(undefined)
        }
      }
      if (key) {
        await formRef.value.validateField(key, cb)
      } else {
        await formRef.value.validate(cb)
      }
    } else {
      reject(undefined)
    }
  })
}

/** 校验所有字段后返回格式化之前的所有数据*/
let validate = (): Promise<object | string> => {
  return new Promise((resolve, reject) => {
    if (formRef.value) {
      formRef.value.validate((valid, fields) => {
        if (valid) {
          resolve(getFieldsValue())
        } else {
          reject(fields)
        }
      })
    } else {
      reject('表单实例还未创建')
    }
  })
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
  validateField,
  validate,
})
</script>
