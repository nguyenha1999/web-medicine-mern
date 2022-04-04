import { Button, Card, Form, Input, message } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useRef, useState } from "react";
import Layout from "../../layout/layout";
import "./index.scss";

const Profile = () => {
  const [user, setUser] = useState({
    email: "",
    password: "1234567",
  });

  const handlerInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const passRef = useRef();

  console.log(passRef.current?.state.value);
  console.log(user.password);

  const submit = () => {
    if (user.password === "1234567") {
      message.error("Mật khẩu không được trùng với mật khẩu cũ");
    } else {
      message.success("Bạn đã thay đổi mật khẩu thành công");
    }
  };

  return (
    <Layout>
      <div style={{ height: "80vh", margin: "auto" }}>
        <Card
          style={{
            width: 400,
            margin: "auto",
            textAlign: "center",
            position: "relative",
            paddingTop: "5px",
          }}
        >
          <div
            style={{
              background: "#74b9ff",
              position: "absolute",
              top: 0,
              width: "100%",
              padding: "30px 0",
              left: 0,
            }}
          ></div>
          <div>
            <Avatar
              className="custom-icon"
              size={50}
              style={{
                backgroundColor: "#1890ff",
                border: "2px solid #fff",
              }}
            >
              H
            </Avatar>
            <h2 style={{ marginTop: 1 }}>Lê Ngọc Hà</h2>
            <h4 style={{ marginTop: 1 }}>lengocha15999@gmail.com</h4>
          </div>
          <Form onFinish={submit}>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu !",
                },
                {
                  min: 6,
                  message: "Mật khẩu phải dài ít nhất 6 kí tự",
                },
              ]}
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
              defaultValue={user.password}
            >
              <div className="form-item-profile" style={{ marginTop: "2px" }}>
                <Input.Password
                  ref={passRef}
                  name="password"
                  onChange={handlerInputChange}
                  defaultValue={user.password}
                />
              </div>
            </Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "10px",
              }}
            >
              <Button htmlType="submit">Cập nhật</Button>
            </div>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};
export default Profile;
