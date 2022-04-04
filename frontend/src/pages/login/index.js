import { Button, Card, Checkbox, Col, Form, Input, message, Row } from "antd";
import React, { useState } from "react";
import Particles from "react-particles-js";
import { useHistory } from "react-router-dom";
import "./index.scss";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  const handlerInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  console.log(user);

  const submit = () => {
    if (
      user.email === "lengocha15999@gmail.com" &&
      user.password === "1234567"
    ) {
      history.push("/");
      message.success("Xin chào Lê Ngọc Hà");
    } else if (
      user.email === "admin@gmail.com" &&
      user.password === "1234567"
    ) {
      history.push("/");
      message.success("Bạn đã đăng nhập với quyền Admin");
    } else {
      message.error("Sai tên Email hoặc Mật Khẩu");
    }
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
            <Card
              bordered={false}
              style={{
                width: "100%",
                padding: "24px",
                marginRight: "16px",
              }}
            >
              <Form
                className="form-login"
                name="basic"
                onFinish={submit}
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
                    marginBottom: "4px",
                    fontWeight: "bold",
                  }}
                >
                  Đăng nhập Hệ thống quản trị
                </h2>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập email của bạn !",
                    },
                    {
                      type: "email",
                      message: "Không đúng định dạng email!",
                    },
                  ]}
                  wrapperCol={{
                    offset: 0,
                    span: 24,
                  }}
                >
                  <Input
                    name="email"
                    placeholder="Tài khoản"
                    onChange={handlerInputChange}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu !",
                    },
                    {
                      min: 6,
                      message: "Mật khẩu phải dài ít nhất 6 kí tự!",
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                      offset: 0,
                      span: 24,
                    }}
                  >
                    <Checkbox checked>Nhớ tài khoản</Checkbox>
                  </Form.Item>
                  <a href="#" style={{ marginTop: "4px" }}>
                    Quên mật khẩu ?
                  </a>
                </div>

                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Đăng nhập
                </Button>
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
export default Login;
