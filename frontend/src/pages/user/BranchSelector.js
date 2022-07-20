import { Select } from "antd";
import React from "react";

const { Option } = Select;

const options = [
  { text: "Phòng IT", value: "Phòng IT" },
  { text: "Phòng Sản Xuất", value: "Phòng Sản Xuất" },
  { text: "Phòng Kinh Doanh", value: "Phòng Kinh Doanh" },
  { text: "Phòng Nhân Sự", value: "Phòng Nhân Sự" },
];

const BranchSelector = ({ onChange, value }) => {
  return (
    <Select placeholder="Select type" value={value} onChange={onChange}>
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.text}
        </Option>
      ))}
    </Select>
  );
};

export default BranchSelector;
