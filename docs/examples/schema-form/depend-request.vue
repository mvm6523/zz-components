<template>
  <div>
    <ZZSchemaForm :columns="columns"></ZZSchemaForm>
  </div>
</template>
<script setup>
import { ZZSchemaForm } from 'zz-components'

let columns = [
  {
    dataIndex: 'province',
    fieldProps: {
      options: [
        {
          label: '福建省',
          value: 'fujian',
        },
        {
          label: '浙江省',
          value: 'zhejiang',
        },
      ],
    },
    formItemProps: {
      label: '省级',
    },
    component: 'select',
  },
  {
    dataIndex: 'city',
    fieldProps: {},
    formItemProps: {
      label: '市级',
    },
    request: ({ getFieldValue, setFieldValue }) => {
      let value = getFieldValue('province')
      if (value === 'fujian') {
        setFieldValue('city', 'fuzhou')
        return [
          {
            label: '福州',
            value: 'fuzhou',
          },
          {
            label: '泉州',
            value: 'quanzhou',
          },
        ]
      } else if (value === 'zhejiang') {
        setFieldValue('city', 'hangzhou')
        return [
          {
            label: '杭州',
            value: 'hangzhou',
          },
          {
            label: '宁波',
            value: 'ningbo',
          },
        ]
      }
      setFieldValue('city', '')
      return []
    },
    component: 'select',
  },
]
</script>
