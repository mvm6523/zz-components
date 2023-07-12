---
title:Json表单
---

# Json表单

## 普通表单

- 通过简单的配置项实现表单功能；
- 其中额外兼容了非常常见的输出数组类型数据的组件 例如这里的时间范围选择

::: tip
根据dataIndex属性自动拆分数组，不需要外部额外操作
:::

:::demo

schema-form/basic

:::

## 依赖表单

- 第二项的label取决于第一项的值；当第一项input值为disabled时，第二项变为无法操作

:::demo

schema-form/depend

:::

### 依赖自身

- 尝试输入颜色，能够直接改变input的文本框颜色

:::demo

schema-form/depend-self

:::

## 自定义组件

- 属性额外设置componentId 根据此id设置插槽

:::demo

schema-form/form-slot

:::

::: tip
此处也可以使用默认的id设置插槽

默认格式为 column.component + column.dataIndex.toString()
:::
