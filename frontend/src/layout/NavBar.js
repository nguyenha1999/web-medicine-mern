// import {
//   FileAddOutlined,
//   FilePdfOutlined,
//   HomeOutlined,
//   TeamOutlined,
//   UserOutlined,
//   UserSwitchOutlined,
// } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserInfoAtom } from "../recoils/Atoms";
import { getRoutes } from "../routes/route-setup";

const NavBar = (props) => {
  const { collapsed } = props;
  const { Sider } = Layout;
  const { pathname } = useLocation();
  const userInfo = useRecoilValue(UserInfoAtom);

  const routes = getRoutes(userInfo?.role);

  return (
    <Sider
      collapsed={collapsed}
      style={{
        background: "#fff",
        borderRadius: "8px",
        // border: "1px solid #ccc",
        margin: "8px",
        boxShadow:
          " 0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      }}
    >
      <Menu
        theme="light"
        defaultSelectedKeys={pathname}
        defaultOpenKeys="import"
        mode="inline"
        style={{
          borderRadius: "8px",
        }}
      >
        {routes?.map((e) => {
          return (
            <Menu.Item key={e.to} icon={e.icon}>
              <NavLink to={e.to}>{e.title}</NavLink>
            </Menu.Item>
          );
        })}
        {/* <Menu.Item key="/" icon={<HomeOutlined />}>
          <NavLink to="/">Trang Chủ</NavLink>
        </Menu.Item>
        <Menu.Item key="/bill" icon={<FilePdfOutlined />}>
          <NavLink to="/bill">Dự án</NavLink>
        </Menu.Item>
        <Menu.Item key="/2" icon={<FilePdfOutlined />}>
          <NavLink to="/chemistries">Sản Phẩm</NavLink>
        </Menu.Item>
        <Menu.Item key="/import" icon={<FileAddOutlined />}>
          <NavLink to="/import">Đơn Nhập</NavLink>
        </Menu.Item>
        <Menu.Item key="/export" icon={<FilePdfOutlined />}>
          <NavLink to="/export">Đơn Xuất</NavLink>
        </Menu.Item>
        <Menu.Item key="/partner" icon={<UserSwitchOutlined />}>
          <NavLink to="/partner">Đối Tác</NavLink>
        </Menu.Item>
        <Menu.Item key="/profile" icon={<UserOutlined />}>
          <NavLink to="/profile">Thông Tin</NavLink>
        </Menu.Item>
        <Menu.Item key="/user" icon={<TeamOutlined />}>
          <NavLink to="/user">Nhân Viên</NavLink>
        </Menu.Item> */}
      </Menu>
    </Sider>
  );
};

export default React.memo(NavBar);
