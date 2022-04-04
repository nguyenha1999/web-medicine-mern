import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";

const ButtonComponent = (props) => {
  const { icon, title, marginLeft, onClick, marginTop, type, disabled } = props;
  return (
    <Button
      {...props}
      disabled={disabled}
      icon={icon}
      type={type}
      style={{ marginLeft: marginLeft, marginTop: marginTop }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

ButtonComponent.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  marginLeft: PropTypes.string || PropTypes.number,
  onClick: PropTypes.func,
  marginTop: PropTypes.string || PropTypes.number,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ButtonComponent;
