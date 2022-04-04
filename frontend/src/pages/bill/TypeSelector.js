import React from "react"
import { Select } from "antd"

const { Option } = Select

const options = [
  { text: "Import", name: "Import" },
  { text: "Export", value: "Export" }
]

const TypeSelector = ({ value, onChange }) => {
  return <Select
    style={{ width: "30%" }}
    placeholder="Select type"
    value={value}
    onChange={onChange}
  >
    {options.map(option => <Option key={option.value}>
      {option.text}
    </Option>)}
  </Select>
}

export default TypeSelector