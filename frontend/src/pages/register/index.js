import { Button, Card, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handlerInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="wraper">
      <div className="container">
        <Row>
          <Col span={12}>
            <div className="bg-image"></div>
          </Col>
          <Col span={3}></Col>
          <Col span={8}>
            <Card bordered={false} style={{ width: "100%", padding: "8px" }}>
              <Form
                className="form-login"
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                initialValues={{
                  remember: true,
                }}
              >
                <h2
                  style={{
                    textAlign: "center",
                    marginBottom: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Đăng ký tài khoản quản trị
                </h2>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tài khoản !",
                    },
                  ]}
                  wrapperCol={{
                    offset: 0,
                    span: 24,
                  }}
                >
                  <Input
                    name="email"
                    onChange={handlerInputChange}
                    placeholder="Tài khoản"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu !",
                    },
                  ]}
                  wrapperCol={{
                    offset: 0,
                    span: 24,
                  }}
                >
                  <Input.Password
                    name="password"
                    placeholder="Mật khẩu"
                    onChange={handlerInputChange}
                  />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu xác nhận !",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error("Mật khẩu không khớp!")
                        );
                      },
                    }),
                  ]}
                  wrapperCol={{
                    offset: 0,
                    span: 24,
                  }}
                >
                  <Input.Password
                    name="confirm"
                    placeholder="Nhập lại mật khẩu"
                    onChange={handlerInputChange}
                  />
                </Form.Item>
                <Form.Item
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ !",
                    },
                  ]}
                  wrapperCol={{
                    offset: 0,
                    span: 24,
                  }}
                >
                  <Input
                    name="firstName"
                    onChange={handlerInputChange}
                    placeholder="Họ"
                  />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên !",
                    },
                  ]}
                  wrapperCol={{
                    offset: 0,
                    span: 24,
                  }}
                >
                  <Input
                    name="lastName"
                    onChange={handlerInputChange}
                    placeholder="Tên"
                  />
                </Form.Item>
                <Button
                  htmlType="submit"
                  style={{
                    width: "100%",
                    color: "#fff",
                    backgroundColor: "#198754",
                  }}
                >
                  Đăng ký
                </Button>
                <div style={{ textAlign: "center", marginTop: "8px" }}>
                  <Link to="/login">Quay về trang đăng nhập ?</Link>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Signup;
