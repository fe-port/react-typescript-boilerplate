/* eslint-disable react/prop-types */
import React from 'react'

import {
  Cascader,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch
} from 'antd'

export type AntdFormItemType =
  | 'Cascader'
  | 'Checkbox'
  | 'DatePicker'
  | 'Input'
  | 'InputNumber'
  | 'Select'
  | 'Slider'
  | 'Switch'
  | 'Radio'
  | 'RadioButton'
  | 'Rate'

export interface BaseFormItemProps {
  title: string
  dataIndex: string
  key: string
  name?: string
  type?: AntdFormItemType
  rules?: {
    message?: string
    required?: boolean
  }[]
  placeholder?: string
  options?: {
    label: string
    value: React.ReactText
    children?: {
      label: string
      value: React.ReactText
      children?: {
        label: string
        value: React.ReactText
      }[]
    }[]
  }[]
}

// type GetFormItem = (arg: BaseFormItemProps) => ReactNode | null

export const getFormItem: React.FC<BaseFormItemProps> = ({
  dataIndex,
  options,
  placeholder = '',
  title,
  type = 'Input'
}) => {
  if (dataIndex === 'action') {
    return null
  }
  if (type === 'Cascader' && options) {
    return <Cascader options={options} placeholder={placeholder} />
  }
  if (type === 'Checkbox') {
    return options ? (
      <Checkbox.Group options={options} />
    ) : (
      <Checkbox>{title}</Checkbox>
    )
  }
  if (type === 'DatePicker') {
    return <DatePicker />
  }
  if (type === 'Input') {
    return <Input placeholder={placeholder} />
  }
  if (type === 'InputNumber') {
    return <InputNumber />
  }
  if (/^(Radio|RadioButton)$/.test(type) && options) {
    const Com = type === 'Radio' ? Radio : Radio.Button
    return (
      <Radio.Group>
        {options.map(j => (
          <Com key={j.value} value={j.value}>
            {j.label}
          </Com>
        ))}
      </Radio.Group>
    )
  }
  if (type === 'Rate') {
    return <Rate />
  }
  if (type === 'Select' && options) {
    return (
      <Select>
        {options.map(j => (
          <Select.Option key={j.value} value={j.value}>
            {j.label}
          </Select.Option>
        ))}
      </Select>
    )
  }
  if (type === 'Slider') {
    return <Slider />
  }
  if (type === 'Switch') {
    return <Switch />
  }
  return null
}
