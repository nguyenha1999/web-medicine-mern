import { Form, Input, Modal, notification } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { uploadFile } from "../../api/chemistry";

// import TextArea from "../../component/TextArea";
import { formConfig } from "./formConfig";
import ImagePreview from "./ImagePreview";

const IMAGE_ID = "imagepreview";

export default memo(({ item, onOk, onCancel }, ref) => {
  const { TextArea } = Input;
  function list_to_tree(list) {
    var map = {},
      node,
      roots = [],
      i;

    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentId !== "0") {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }

  var entries = [
    {
      id: "12",
      parentId: "0",
      text: "Man",
      level: "1",
      children: null,
    },
    {
      id: "6",
      parentId: "12",
      text: "Boy",
      level: "2",
      children: null,
    },
    {
      id: "7",
      parentId: "12",
      text: "Other",
      level: "2",
      children: null,
    },
    {
      id: "9",
      parentId: "0",
      text: "Woman",
      level: "1",
      children: null,
    },
    {
      id: "11",
      parentId: "9",
      text: "Girl",
      level: "2",
      children: null,
    },
  ];

  console.log(list_to_tree(entries));

  const [confirmLoading, setConfirmLoading] = useState(false);
  const method = useForm();
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
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
    });
  }, [form, item]);

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

        let formData = new FormData();
        console.log(file);
        formData.append("file", file);
        console.log(formData);
        const res = await uploadFile(file);
        console.log(res?.imageUrl);
        data.imageUrl = res;
        await onOk(data);
        // resetImage();
      } catch (err) {
        notification.error({ message: err.message });
      }
      setConfirmLoading(false);
    },
    [file, item, onOk]
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
        <Form form={form} name="control-hooks" onFinish={onFinish}>
          {Object.entries(formConfig)?.map(([key, value]) =>
            render(key, value)
          )}
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
    </FormProvider>
  );
});
