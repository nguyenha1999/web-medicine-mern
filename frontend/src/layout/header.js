import { MenuOutlined } from "@ant-design/icons";
import { Avatar, Col, Dropdown, Layout, Menu, Row } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../img/logo.png";
import "./layout.css";

const { Header } = Layout;

const HeaderComponent = (props) => {
  const { click } = props;
  const history = useHistory();
  const roleUser = localStorage.getItem("role");
  const nameUser = localStorage.getItem("name");
  const goBack = () => {
    localStorage.clear();
    history.push("/login");
  };
  const login = () => {
    history.push("/login");
  };
  const menu = (
    <Menu style={{ width: 220 }}>
      <Menu.Item key="0">
        <Link to="/profile">Hồ sơ</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={login}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  const renderAvt = () => {
    return (
      <>
        <Dropdown overlay={menu} trigger={["click"]}>
          <Avatar
            className="custom-icon"
            style={{
              backgroundColor: "#00a2ae",
            }}
          >
            H
          </Avatar>
        </Dropdown>
      </>
    );
  };

  return (
    <Header style={{ padding: "0 30px" }} className="site-layout-background">
      <Row width="100%">
        <Col span={8} style={{ textAlign: "left" }}>
          <MenuOutlined onClick={click} style={{ fontSize: "20px" }} />
          <img src={logo} alt="logo" className="logo" />
        </Col>
        <Col span={8}>
          <h1>APP QUẢN LÝ NHÀ MÁY HOÁ CHẤT</h1>
        </Col>
        <Col span={8} style={{ textAlign: "right", paddingRight: "30px" }}>
          {renderAvt()}
        </Col>
      </Row>
    </Header>
  );
};

HeaderComponent.propTypes = {
  click: PropTypes.func,
};

export default React.memo(HeaderComponent);
