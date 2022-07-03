import { DatePicker, Input, TimePicker } from "antd";
import { memo } from "react";
import Select from "./Select";
import TextArea from "./TextArea";

export default memo((props) => {
  const { type } = props;
  if (type === "textarea") {
    return <TextArea />;
  } else if (type === "select") {
    return <Select />;
  } else if (type === "date") {
    return <DatePicker />;
  } else if (type === "time") {
    return <TimePicker />;
  } else {
    return <Input />;
  }
});
