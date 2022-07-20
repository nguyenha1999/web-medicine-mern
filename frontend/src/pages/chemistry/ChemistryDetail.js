import { Form, Input, message, Modal } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

// import TextArea from "../../component/TextArea";
import { formConfig } from "./formConfig";
import StateSelector from "./selector/stateSelector";
import UnitSelector from "./selector/unitSelector";

const IMAGE_ID = "imagepreview";

export default memo(({ item, onOk, onCancel }, ref) => {
  const { TextArea } = Input;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const method = useForm();
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();

  const isEdit = !!item?._id;
  const title = isEdit ? "Sửa hoá chất" : "Thêm hoá chất";

  useEffect(() => {
    if (!item) return;

    form.setFieldsValue({
      name: item.name,
      use: item.use,
      code: item.code,
      price: item.price,
      unit: item.unit,
      state: item.state,
    });
  }, [form, item]);

  const resetImage = () => {
    setFile(null);
    const input = document.getElementById(IMAGE_ID);
    input && (input.value = "");
  };

  const onFinish = useCallback(
    async (values) => {
      setConfirmLoading(true);
      try {
        const data = { ...values };
        if (!!item?._id) {
          data._id = item._id;
        }

        await onOk(data);
      } catch (error) {
        message.error(error.message);
      }
      setConfirmLoading(false);
    },
    [item, onOk]
  );

  const renderInput = (key) => {
    const data = formConfig[key];
    const { label, rules } = data;
    return (
      <Form.Item
        name={key}
        label={label}
        rules={rules}
        wrapperCol={{
          offset: 0,
          span: 24,
        }}
      >
        <Input />
      </Form.Item>
    );
  };
  const renderTextArea = (key) => {
    const data = formConfig[key];
    const { label, rules } = data;
    return (
      <Form.Item
        name={key}
        label={label}
        rules={rules}
        wrapperCol={{
          offset: 0,
          span: 24,
        }}
      >
        <TextArea />
      </Form.Item>
    );
  };

  const render = (key, value) => {
    const { type } = value;

    if (!type) {
      return renderInput(key);
    }

    if (type === "textarea") {
      return renderTextArea(key);
    }

    return null;
  };

  return (
    <FormProvider {...method}>
      <Modal
        title={title}
        visible={!!item}
        onOk={() => form.submit()}
        onCancel={() => {
          resetImage();
          onCancel();
        }}
        confirmLoading={confirmLoading}
      >
        <Form
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
        >
          {Object.entries(formConfig)?.map(([key, value]) =>
            render(key, value)
          )}
          <Form.Item
            label="Đơn vị"
            name="unit"
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <UnitSelector />
          </Form.Item>
          <Form.Item
            label="Trạng thái"
            name="state"
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <StateSelector />
          </Form.Item>
        </Form>
      </Modal>
    </FormProvider>
  );
});
