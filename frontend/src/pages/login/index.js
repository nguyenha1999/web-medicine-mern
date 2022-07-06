/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Checkbox, Col, Form, Input, message, Row } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { login } from "../../api/user";
import { UserInfoAtom } from "../../recoils/Atoms";
import "./index.scss";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  const setUserInfo = useSetRecoilState(UserInfoAtom);

  const handlerInputChange = (event) => {
    const username = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [username]: value });
  };

  const submit = async (valueForm) => {
    try {
      const datas = { ...valueForm };
      const res = await login(datas);
      const { data } = res;
      const { role } = data?.user;
      if (data?.user) {
        history.push("/");
        // delete data?.user?.password;
        setUserInfo(data?.user);
        localStorage.setItem("vnd-medicine-role", role);
        message.success(`chào mừng bạn ${data?.user?.username}`);
      }
    } catch (error) {
      message.error("Looxi");
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
    </div>
  );
};
export default Login;
