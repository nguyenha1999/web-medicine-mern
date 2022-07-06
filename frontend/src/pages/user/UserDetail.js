import { Form, Input, message, Modal } from "antd";
import { useCallback, useEffect, useState } from "react";
import BranchSelector from "./BranchSelector";
import RoleSelector from "./RoleSelector";
import ServiceSelector from "./ServiceSelector";

const UserDetail = ({ item, onOk, onCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState();

  const reset = () =>
    setData({
      username: "",
      branch: "",
      value: "",
      email: "",
      tel: "",
      code: "",
      password: "",
      role: "",
    });

  useEffect(() => {
    if (!item) return;

    form.setFieldsValue({
      email: item.email,
      password: item.password,
      username: item.username,
      code: item.code,
      value: item.value,
      branch: item.branch,
    });
  }, [form, item]);

  const onFinish = useCallback(
    async (values) => {
      setConfirmLoading(true);
      try {
        setData(values);
        if (!!item?._id) {
          data._id = item._id;
        }
        await onOk(data);
        reset();
      } catch (err) {
        message.error("Cos lox xay ra");
      }
      setConfirmLoading(false);
    },
    [data, item, onOk]
  );

  const isEdit = !!item?._id;
  const title = isEdit ? "Sửa Thông Tin Nhân Viên" : "Thêm Nhân Viên";

  return (
    <Modal
      title={title}
      visible={!!item}
      onOk={() => {
        form.submit();
      }}
      onCancel={() => {
        onCancel();
      }}
      confirmLoading={confirmLoading}
    >
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          label="Tên Nhân Viên"
          name="username"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên nhân viên!!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mã Nhân Viên"
          name="code"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên nhân viên!!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email của bạn!!",
            },
            {
              type: "email",
              message: "Không đúng định dạng email!",
            },
          ]}
        >
          <Input style={{ width: "360px", marginLeft: "54px" }} />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu của bạn!!",
            },
            {
              min: 6,
              message: "Mật khẩu phải dài hơn 6 kí tự!",
            },
          ]}
        >
          <Input.Password
            placeholder="******"
            style={{ width: "360px", marginLeft: "29px" }}
          />
        </Form.Item>
        <Form.Item
          label="Chức Vụ"
          name="value"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập chức vụ của nhân viên!!",
            },
          ]}
        >
          <ServiceSelector />
        </Form.Item>
        <Form.Item
          label="Bộ Phận"
          name="branch"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên bộ phận làm việc!!",
            },
          ]}
        >
          <BranchSelector />
        </Form.Item>
        <Form.Item
          label="Quyền trên hệ thống"
          name="role"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên bộ phận làm việc!!",
            },
          ]}
        >
          <RoleSelector />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserDetail;
