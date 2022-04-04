import { Button, Card, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import Particles from "react-particles-js";
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
      <div className="bg-overlay">
        <Particles
          params={{
            particles: {
              number: {
                value: 20,
                density: {
                  enable: true,
                  value_area: 1000,
                },
              },
              color: {
                value: "#1e90ff",
              },
              shape: {
                type: "circle",
                stroke: {
                  width: 0,
                  color: "#000000",
                },
                polygon: {
                  nb_sides: 5,
                },
                image: {
                  src: "img/github.svg",
                  width: 100,
                  height: 100,
                },
              },
              opacity: {
                value: 0.5,
                random: false,
                anim: {
                  enable: false,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false,
                },
              },
              size: {
                value: 3,
                random: true,
                anim: {
                  enable: false,
                  speed: 40,
                  size_min: 0.1,
                  sync: false,
                },
              },
              line_linked: {
                enable: true,
                distance: 150,
                color: "#1e90ff",
                opacity: 1,
                width: 2,
              },
              move: {
                enable: true,
                speed: 6,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200,
                },
              },
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: true,
                  mode: "repulse",
                },
                onclick: {
                  enable: true,
                  mode: "push",
                },
                resize: true,
              },
              modes: {
                grab: {
                  distance: 400,
                  line_linked: {
                    opacity: 1,
                  },
                },
                bubble: {
                  distance: 400,
                  size: 40,
                  duration: 2,
                  opacity: 8,
                  speed: 3,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
                push: {
                  particles_nb: 4,
                },
                remove: {
                  particles_nb: 2,
                },
              },
            },
            retina_detect: true,
          }}
        />
      </div>
    </div>
  );
};
export default Signup;
