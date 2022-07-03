import { Form, Input } from "antd";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

export default forwardRef((props, ref) => {
  const { TextArea } = Input;
  const { formConfig } = props;
  const { id, rules, label } = formConfig;
  const { register } = useFormContext();
  //   const { ref: rhfRef, ...registerProps } = register(id);
  return (
    <Form.Item name={id} label={label} rules={rules}>
      <TextArea style={{ flex: 1 }} {...register(id)} />
    </Form.Item>
  );
});
