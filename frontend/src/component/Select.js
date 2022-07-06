import { Form, Select } from "antd";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

export default forwardRef((props, ref) => {
  const { formConfig } = props;
  const { id, rules, label } = formConfig;
  const { register } = useFormContext();
  //   const { ref: rhfRef, ...registerProps } = register(id);
  return (
    <Form.Item name={id} label={label} rules={rules}>
      <Select style={{ flex: 1 }} {...register(id)} />
    </Form.Item>
  );
});
