import { Form, Input, Modal, notification } from "antd";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { uploadFile } from "../../api/axiosClient";
// import TextArea from "../../component/TextArea";
import API from "../../api/api";
import { formConfig } from "./formConfig";
import ImagePreview from "./ImagePreview";

const IMAGE_ID = "imagepreview";

export default forwardRef(({ item, onOk, onCancel }, ref ) => {
  const { TextArea } = Input;
  const [show, setShow] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const method = useForm();
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [form] = Form.useForm();

  const isEdit = !!item?._id;
  const title = isEdit ? "Sửa hoá chất" : "Thêm hoá chất";

  useImperativeHandle(ref, () => ({
    show() {
      setShow(true);
    },
  }));

  const checkExistMutate = useMutation((data) => {
    const config = {
      params: data,
      url: `root/chemistry/`,
    };
    return API.request(config);
  });

  const postData = useMutation(
    (data) => {
      console.log(data);
      const config = {
        method: "POST",
        params: data,
        url: `root/chemistry`,
      };
      return API.request(config);
    },
    {
      onSuccess: () => {
        setConfirmLoading(false);
      },
    }
  );

  useEffect(() => {
    if (!item) return;

    console.log(item);

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

        if (!!file) {
          const formData = new FormData();
          const fileName = file.name;
          formData.append("file", file, fileName);
          const res = await uploadFile(formData);
          data.imageUrl = res.data;
        }

        postData.mutate(data);
        resetImage();
      } catch (err) {
        notification.error({ message: err.message });
      }
      setConfirmLoading(false);
    },
    [file, item, postData]
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
