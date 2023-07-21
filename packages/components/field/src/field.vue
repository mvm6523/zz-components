<template>
  <div v-show="mode === 'readonly'">
    <slot name="readonly" :value="getReadValue()">
      {{ getReadValue() }}
    </slot>
  </div>
  <div v-if="firstRender" v-show="mode === 'create' || mode === 'update'">
    <el-form-item
      v-bind="innerFormItemProps"
      :prop="dataIndex"
      ref="formItemRef"
    >
      <slot
        name="component"
        v-bind="{ ...innerFieldProps, ...autoConfig }"
        :modelValue="value"
        :options="options"
        @[changeModel]="modelValueChange"
        @[changeKeyword]="keywordChange"
      >
        <component
          ref="dynamicComponent"
          :is="renderComponent"
          v-bind="{ ...innerFieldProps, ...autoConfig }"
          :modelValue="value"
          :options="options"
          :loading="loading"
          @[changeModel]="modelValueChange"
          @[changeKeyword]="keywordChange"
        >
          <slot v-if="slots.default" />
        </component>
      </slot>
    </el-form-item>
  </div>
</template>
<script lang="tsx" setup>
import {
  ref,
  watch,
  nextTick,
  onBeforeUnmount,
  effectScope,
  computed,
  inject,
  isRef,
  useSlots,
  reactive,
} from 'vue'
import { fieldProps as zFieldProps, fieldEmits } from './field'
import {
  UPDATE_KEYWORD_EVENT,
  UPDATE_MODEL_EVENT,
} from '@zz-components/constants'
import type { FieldChange } from '../../form'
import { formContextKey } from '../../form'
import _ from 'lodash-es'
import { isPromise } from '@zz-components/utils'

let slots = useSlots()

const COMPONENT_NAME = 'ZZField'
defineOptions({
  name: COMPONENT_NAME,
})

const changeModel = UPDATE_MODEL_EVENT
const changeKeyword = UPDATE_KEYWORD_EVENT

let formItemRef = ref(null)

let {
  mode,
  fieldProps,
  formItemProps,
  component,
  dataIndex,
  componentId,
  request,
  params,
  config,
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
  radio: 'z-z-radio',
  radioButton: 'z-z-radio-btn',
  rate: 'el-rate',
  select: 'z-z-select',
  selectVirtualized: 'el-select-v2',
  slider: 'el-slider',
  switch: 'el-switch',
  time: 'el-time-picker',
  timeSelect: 'el-time-select',
  transfer: 'z-z-transfer',
  upload: 'el-upload',
  treeSelect: 'z-z-tree-select',
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
  // if (valueEnum) {
  //   return valueEnum.find((item) => item.value === value.value)?.label
  // }
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
    this: config,
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

/** 处理请求相关逻辑  开始  */
let options = ref((fieldProps && fieldProps.options) || [])
let loading = ref(false)
let keyword = ref('')
let autoConfig = reactive<Record<string, unknown>>({})
const keywordChange = (query: string) => {
  if (query) {
    keyword.value = query
  }
}
const loadOptions = () => {
  if (request) {
    autoConfig.filterable = true
    autoConfig.remote = true
    let res = request({ params, keyword: keyword.value })
    loading.value = true
    if (isPromise(res)) {
      res
        .then((res) => {
          options.value = res
        })
        .finally(() => {
          loading.value = false
        })
    } else if (Array.isArray(res)) {
      options.value = res
      loading.value = false
    } else {
      console.error('request 函数返回值应为Promise 或者 数组')
      loading.value = false
    }
  }
}

watch(
  () => [params, keyword.value],
  () => {
    loadOptions()
  },
  {
    deep: true,
    immediate: true,
  }
)

/** 处理请求相关逻辑  结束  */

onBeforeUnmount(() => {
  scope.stop()
})
</script>
