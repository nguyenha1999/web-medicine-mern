import { Select } from "antd";
import React, { memo } from "react";

const { Option } = Select;

const options = [
  { text: "Thùng (10L)", value: "Thùng (10L)" },
  { text: "Vỉ", value: "Vỉ" },
  { text: "Bình nén", value: "Bình nén" },
  { text: "Gói", value: "Gói" },
  { text: "Cuộn", value: "Cuộn" },
  { text: "Thỏi", value: "Thỏi" },
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
