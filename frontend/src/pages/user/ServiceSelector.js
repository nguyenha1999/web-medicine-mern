import { Select } from "antd";
import React from "react";

const { Option } = Select;

const options = [
  { text: "Nhân Viên", value: "Nhân viên" },
  { text: "Thực Tập Sinh", value: "Thực tập sinh" },
  { text: "Nhân Viên Thử Việc", value: "Nhân viên thử việc" },
  { text: "PM", value: "PM" },
  { text: "TechLead", value: "TechLead" },
  { text: "Designer", value: "Designer" },
];

const ServiceSelector = ({ value, onChange }) => {
  return (
    <Select
      style={{ width: "360px", marginLeft: "35px" }}
      placeholder="Select type"
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <Option key={option.text} value={option.value}>
          {option.text}
        </Option>
      ))}
    </Select>
  );
};

export default ServiceSelector;
