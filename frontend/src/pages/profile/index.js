import { Button, Card, Form, Input, message } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { updateProfile } from "../../api/user";
import Layout from "../../layout/layout";
import { UserInfoAtom } from "../../recoils/Atoms";
import "./index.scss";

const Profile = () => {
  const [user, setUser] = useRecoilState(UserInfoAtom);
  const { setValue, register } = useForm();

  const handlerInputChange = useCallback(
    (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setUser({ ...user, [name]: value });
    },
    [setUser, user]
  );

  const submit = async (values) => {
    try {
      console.log(values);
      await updateProfile({ ...values, _id: user?._id });
      message.success(`Chỉnh sửa thông tin ${user?.username} thành công !!!`);
    } catch (err) {
      message.error("Chỉnh sửa thông tin thất bại!!!");
    }
  };

  useEffect(() => {
    if (user) {
      const { password } = user;
      setValue("password", password);
    }
  }, [setValue, user]);
  const passRef = useRef();

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
            <h2 style={{ marginTop: 1 }}>{user.username}</h2>
            <h4 style={{ marginTop: 1 }}>{user.email}</h4>
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
            >
              <div className="form-item-profile" style={{ marginTop: "2px" }}>
                <Input.Password
                  ref={passRef}
                  name="password"
                  onChange={handlerInputChange}
                  defaultValue={user?.password}
                  {...register("password")}
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
