import {
  computed,
  defineComponent,
  inject,
  ref,
  watch,
  nextTick,
  effectScope,
  isRef,
  onBeforeUnmount,
  reactive,
  toValue,
  h,
} from 'vue'
import { fieldProps } from './field.props'
import { formContextKey, FieldChange } from '../../form'
import {
  UPDATE_KEYWORD_EVENT,
  UPDATE_MODEL_EVENT,
} from '@zz-components//constants'
import _ from 'lodash-es'
import { isPromise } from '@zz-components/utils'

import { ElInput } from 'element-plus'
import { ZZRadio, ZZRadioBtn } from '../../radio'

export default defineComponent({
  name: 'ZZField',
  install: null,
  props: fieldProps,
  components: {
    ElInput,
    ZZRadio,
    ZZRadioBtn,
  },
  emits: ['update:modelValue'],
  setup(props, { expose, emit, slots }) {
    const {
      mode,
      fieldProps,
      formItemProps,
      component,
      dataIndex,
      componentId,
      request,
      params,
      config,
    } = props
    // 组件映射关系
    const renderMap = {
      autocomplete: 'el-autocomplete',
      cascader: 'el-cascader',
      checkbox: 'el-checkbox',
      checkboxGroup: 'el-checkbox-group',
      colorPicker: 'el-color-picker',
      date: 'el-date-picker',
      input: ElInput,
      inputNumber: 'el-input-number',
      radio: ZZRadio,
      radioButton: ZZRadioBtn,
      rate: 'el-rate',
      select: 'ZZSelect',
      selectVirtualized: 'el-select-v2',
      slider: 'el-slider',
      switch: 'el-switch',
      time: 'el-time-picker',
      timeSelect: 'el-time-select',
      transfer: 'z-z-transfer',
      upload: 'el-upload',
      treeSelect: 'z-z-tree-select',
    }
    const renderComponent = renderMap[component] || component

    const formItemRef = ref(null)

    const formContext = inject(formContextKey, undefined)

    const display = computed(() => {
      return formContext?.getDisplay(componentId)
    })

    const value = computed({
      get: () => {
        if (typeof dataIndex === 'string') {
          return formContext?.formData.value[dataIndex]
        } else {
          const arr: unknown[] = []
          for (const i in dataIndex) {
            arr[i] = [formContext?.formData.value[dataIndex[i]]]
          }
          return arr
        }
      },
      set: (val) => {
        emit(UPDATE_MODEL_EVENT, dataIndex, val)
      },
    })

    const modelValueChange = (val) => {
      value.value = val
    }

    // 是否进行初次渲染
    const firstRender = ref(false)

    /**
     * @description 只检测到mode不为read时，此时允许动态组件渲染
     */
    const stopModeWatch = watch(
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
    const getFieldValue = (key: string) => {
      return formContext?.formData.value[key]
    }
    const formExpose = {
      setFieldValue: fieldChange,
      getFieldValue,
      this: config,
    }
    if (haveFormItemChange || haveFieldItemChange) {
      scope.run(() => {
        if (haveFormItemChange) {
          _formProp = computed(() => {
            return formItemProps!.onChange!(formExpose) as object
          })
        }
        if (haveFieldItemChange) {
          _fieldProp = computed(() => {
            return fieldProps!.onChange!(formExpose) as object
          })
        }
      })
    }

    // 由原来的formItemProps和其中的onChange生成
    const innerFormItemProps = computed(() => {
      const obj = _.omit(formItemProps, 'onChange')
      if (isRef(_formProp)) {
        Object.assign(obj, _formProp.value)
      }
      return obj
    })
    // 由原来的fieldProps和其中的onChange生成
    const innerFieldProps = computed(() => {
      const obj = _.omit(fieldProps, 'onChange')
      if (isRef(_fieldProp)) {
        Object.assign(obj, _fieldProp.value)
      }
      return obj
    })

    console.log(fieldProps && fieldProps.options)
    /** 处理请求相关逻辑  开始  */
    const options = ref(
      fieldProps && fieldProps.options ? toValue(fieldProps.options) : []
    )
    console.log(options)
    const loading = ref(false)
    const keyword = ref('')
    const autoConfig = reactive<Record<string, unknown>>({})
    const keywordChange = (query: string) => {
      if (query) {
        keyword.value = query
      }
    }

    if (request) {
      const regexp = /getFieldValue\('.*'\)/g
      const dependKeys = (request.toString().match(regexp) || []).map((item) =>
        item.replace(/getFieldValue\('([^']*)'\)/, '$1')
      )
      const loadOptions = () => {
        autoConfig.filterable = true
        autoConfig.remote = true
        const res = request!({
          params,
          keyword: keyword.value,
          getFieldValue,
          setFieldValue: fieldChange,
        })
        loading.value = true
        if (isPromise(res)) {
          res
            .then((res) => {
              options.value = toValue(res)
            })
            .finally(() => {
              loading.value = false
            })
        } else if (Array.isArray(res)) {
          options.value = toValue(res)
          loading.value = false
        } else {
          console.error('request 函数返回值应为Promise 或者 数组')
          loading.value = false
        }
      }

      dependKeys.forEach((item) => {
        watch(
          () => getFieldValue(item),
          () => {
            loadOptions()
          }
        )
      })

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
    }

    /** 处理请求相关逻辑  结束  */

    onBeforeUnmount(() => {
      scope.stop()
    })

    const renderItem = () => {
      const params = {
        ...innerFieldProps.value,
        ...autoConfig,
        modelValue: value.value,
        options: options.value,
        loading: loading.value,
        'onUpdate:modelValue': modelValueChange,
        'onUpdate:keyword': keywordChange,
      }
      if (slots.component) {
        console.log('渲染插槽')
      } else {
        console.log('渲染动态组件：')
        console.log(renderComponent)
      }
      // console.log(toValue(options))
      // console.log(isProxy(options))

      const _slots: any = {}
      if (slots.default) {
        _slots.default = (params) => slots.default!(params)
      }
      return slots.component
        ? slots.component(params)
        : h(renderComponent, params)
      // <component ref="dynamicComponent" {...params} is={renderComponent} />
    }

    return () =>
      display.value === 'display' ? (
        mode === 'readonly' ? (
          <span>{slots.readonly ? slots.readonly(value) : value}</span>
        ) : firstRender.value ? (
          <div>
            <el-form-item
              ref="formItemRef"
              prop={dataIndex}
              {...innerFormItemProps.value}
            >
              {renderItem()}
            </el-form-item>
          </div>
        ) : (
          <></>
        )
      ) : (
        <></>
      )
  },
})
