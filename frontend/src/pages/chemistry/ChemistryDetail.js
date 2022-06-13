import { Form, Input, Modal, notification } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { uploadFile } from "../../api/axiosClient";
import ImagePreview from "./ImagePreview";

const IMAGE_ID = "imagepreview";

const ChemistryDetail = ({ item, onOk, onCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [form] = Form.useForm();

  const isEdit = !!item?._id;
  const title = isEdit ? "Sửa hoá chất" : "Thêm hoá chất";

  const { TextArea } = Input;

  useEffect(() => {
    if (!item) return;

    form.setFieldsValue({
      name: item.name,
      use: item.use,
      code: item.code,
      price: item.price,
    });
  }, [item]);

  const resetImage = () => {
    setFile(null);
    setImagePreviewUrl("");
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

        if (!!file) {
          const formData = new FormData();
          const fileName = file.name;
          formData.append("file", file, fileName);
          const res = await uploadFile(formData);
          data.imageUrl = res.data;
        }

        console.log(data);
        await onOk(data);
        resetImage();
      } catch (err) {
        notification.error({ message: err.message });
      }
      setConfirmLoading(false);
    },
    [item, onOk, file]
  );

  return (
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
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Tên hoá chất"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên hoá chất !",
            },
          ]}
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="code"
          label="Mã hoá chất"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã hoá chất!",
            },
          ]}
        >
          <Input style={{ flex: 1 }} />
        </Form.Item>
        <Form.Item
          name="price"
          label="Giá hoá chất"
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá hoá chất!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="use"
          label="Cách sử dụng"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập cách dùng hoá chất!",
            },
          ]}
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
        >
          <TextArea />
        </Form.Item>
        <ImagePreview
          imageId={IMAGE_ID}
          imageUrl={item?.imageUrl}
          imagePreviewUrl={imagePreviewUrl}
          setImagePreviewUrl={setImagePreviewUrl}
          setFile={setFile}
          maxHeight="70vh"
        />
      </Form>
    </Modal>
  );
};

export default ChemistryDetail;
