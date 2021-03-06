import { Select } from "antd";

const { Option } = Select;

const options = [
  { text: "Admin", value: "admin" },
  { text: "Staff", value: "staff" },
];

const RoleSelector = ({ value, onChange }) => {
  return (
    <Select placeholder="Select type" value={value} onChange={onChange}>
      {options.map((option) => (
        <Option key={option.text} value={option.value}>
          {option.text}
        </Option>
      ))}
    </Select>
  );
};

export default RoleSelector;
