<template>
  <div v-show="mode === 'readonly'">
    <slot name="readonly" :value="getReadValue()">
      {{ getReadValue() }}
    </slot>
  </div>
  <div v-if="firstRender" v-show="mode === 'create' || mode === 'update'">
    <el-form-item v-bind="innerFormItemProps" ref="elFormItem">
      <slot
        v-bind="innerFieldProps"
        :modelValue="value"
        @update:modelValue="modelValueChange"
      >
        <component
          :is="renderComponent"
          v-bind="innerFieldProps"
          :modelValue="value"
          @update:modelValue="modelValueChange"
        ></component>
      </slot>
    </el-form-item>
  </div>
</template>
<script setup lang="ts">
import {
  ref,
  watch,
  nextTick,
  onBeforeUnmount,
  effectScope,
  computed,
  inject,
  isRef,
} from 'vue'
import { fieldProps as zFieldProps, fieldEmits } from './field'
import { UPDATE_MODEL_EVENT } from '@zz-components/constants'
import type { FieldChange } from '../../form'
import { formContextKey } from '../../form'
import _ from 'lodash-es'

const COMPONENT_NAME = 'ZZField'
defineOptions({
  name: COMPONENT_NAME,
})

let elFormItem = ref(null)

let {
  mode,
  valueEnum,
  fieldProps,
  formItemProps,
  component,
  dataIndex,
  componentId,
} = defineProps(zFieldProps)
const emit = defineEmits(fieldEmits)

let renderMap = {
  autocomplete: 'el-autocomplete',
  cascader: 'el-cascader',
  checkbox: 'el-checkbox',
  checkboxGroup: 'el-checkbox-group',
  colorPicker: 'el-color-picker',
  date: 'el-date-picker',
  input: 'el-input',
  inputNumber: 'el-input-number',
  radio: 'el-radio-group', //需完成
  radioButton: 'el-radio-group', //需完成
  rate: 'el-rate',
  select: 'el-select', //需完成
  slider: 'el-slider',
  switch: 'el-switch',
  time: 'el-time-picker',
  timeSelect: 'el-time-select',
  transfer: 'el-transfer', //需完成
  upload: 'el-upload',
  treeSelect: 'el-tree-select',
}
let renderComponent = renderMap[component] || component

const formContext = inject(formContextKey, undefined)

let value = computed({
  get: () => {
    if (typeof dataIndex === 'string') {
      return formContext?.formData.value[dataIndex]
    } else {
      let arr: unknown[] = []
      for (let i in dataIndex) {
        arr[i] = [formContext?.formData.value[dataIndex[i]]]
      }
      return arr
    }
  },
  set: (val) => {
    emit(UPDATE_MODEL_EVENT, dataIndex, val)
  },
})

let modelValueChange = (val) => {
  value.value = val
}

/**
 * @description 获取只读模式时要显示的值
 */
let getReadValue = () => {
  if (valueEnum) {
    return valueEnum.find((item) => item.value === value.value)?.label
  }
  return value
}

// 是否进行初次渲染
let firstRender = ref(false)

/**
 * @description 只检测到mode不为read时，此时允许动态组件渲染
 */
let stopModeWatch = watch(
  () => mode,
  (value) => {
    if (value !== 'readonly') {
      firstRender.value = true
      nextTick(() => {
        stopModeWatch()
      })
    }
  },
  {
    immediate: true,
  }
)

const fieldChange: FieldChange = function (key, value) {
  if (Array.isArray(key)) {
    try {
      for (const i in key) {
        fieldChange[key[i]] = (value as object)[key[i]]
      }
    } catch (e) {
      console.error('value 数据类型应为对象类型')
    }
  } else {
    emit(UPDATE_MODEL_EVENT, dataIndex, value)
  }
}

// 由原来的formItemProps和其中的onChange生成
let innerFormItemProps = computed(() => {
  let obj = _.omit(formItemProps, 'onChange')
  if (isRef(_formProp)) {
    Object.assign(obj, _formProp.value)
  }
  return obj
})
// 由原来的fieldProps和其中的onChange生成
let innerFieldProps = computed(() => {
  let obj = _.omit(fieldProps, 'onChange')
  if (isRef(_fieldProp)) {
    Object.assign(obj, _fieldProp.value)
  }
  return obj
})

// 判断是否存在onChange事件
let haveFormItemChange = false
if (formItemProps && formItemProps.onChange) {
  haveFormItemChange = true
}
let haveFieldItemChange = false
if (fieldProps && fieldProps.onChange) {
  haveFieldItemChange = true
}

let _formProp: any = null
let _fieldProp: any = null
// 借用vue自身的机制实现响应式依赖变更🎉🎉
const scope = effectScope()
if (haveFormItemChange || haveFieldItemChange) {
  let params = {
    setFieldValue: fieldChange,
    getFieldValue: (key: string) => {
      return formContext?.formData.value[key]
    },
  }
  scope.run(() => {
    if (haveFormItemChange) {
      _formProp = computed(() => {
        return formItemProps!.onChange!(params) as object
      })
    }
    if (haveFieldItemChange) {
      _fieldProp = computed(() => {
        return fieldProps!.onChange!(params) as object
      })
    }
  })
}

onBeforeUnmount(() => {
  scope.stop()
})
</script>
