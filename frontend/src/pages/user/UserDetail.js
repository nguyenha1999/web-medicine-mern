import { Form, Input, message, Modal } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import BranchSelector from "./BranchSelector";
import ServiceSelector from "./ServiceSelector";

const UserDetail = ({ item, onOk, onCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!item) return;

    form.setFieldsValue({
      emailUser: item.emailUser,
      passwordUser: item.passwordUser,
      nameUser: item.nameUser,
      Id: item.Id,
      vlue: item.vlue,
      branch: item.branch,
    });
  }, [item]);

  const onFinish = useCallback(
    async (values) => {
      setConfirmLoading(true);
      try {
        const data = { ...values };
        if (!!item?._id) {
          data._id = item._id;
        }
        await onOk(data);
      } catch (err) {
        message.error({ message: err.message });
      }
      setConfirmLoading(false);
    },
    [item, onOk]
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
          name="nameUser"
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
          name="Id"
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
          name="emailUser"
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
          name="passwordUser"
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
          name="vlue"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập chức vụ của nhân viên!!",
            },
          ]}
        >
          {/* <Input style={{ width: "360px", marginLeft: "35px" }} /> */}
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
          {/* <Input style={{ width: "360px", marginLeft: "35px" }} /> */}
          <BranchSelector />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserDetail;
