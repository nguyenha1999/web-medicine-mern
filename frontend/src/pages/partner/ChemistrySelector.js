import { Select } from "antd";
import React from "react";

const { Option } = Select;

const ChemistrySelector = ({ options, value, onChange }) => {
  return (
    <Select
      mode="multiple"
      allowClear
      style={{ width: "100%", marginLeft: "8px" }}
      placeholder="Please select"
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <Option key={option._id}>{option.name}</Option>
      ))}
    </Select>
  );
};

export default ChemistrySelector;
