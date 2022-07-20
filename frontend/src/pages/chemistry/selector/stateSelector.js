import { Select } from "antd";
import React, { memo } from "react";

const { Option } = Select;

const options = [
  { text: "Trạng thái rắn", value: "Trạng thái rắn" },
  { text: "Trạng thái lỏng", value: "Trạng thái lỏng" },
  { text: "Trạng thái khí", value: "Trạng thái khí" },
];

export default memo(({ value, onChange }) => {
  return (
    <Select placeholder="Select type" value={value} onChange={onChange}>
      {options.map((option) => (
        <Option key={option.text} value={option.value}>
          {option.text}
        </Option>
      ))}
    </Select>
  );
});
