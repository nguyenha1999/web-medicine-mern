import { Input, InputNumber, Typography } from "antd";
import PropTypes from "prop-types";

const { Title } = Typography;

const BoxInput = (props) => {
  const { title, isInput } = props;

  const styleBox = {
    display: "flex",
    alignItems: "center",
    marginLeft: "50px",
  };

  const styleTitle = {
    marginTop: "5px",
  };

  const styleInputNumber = {
    marginLeft: "30px",
  };

  const styleInputText = {
    marginLeft: "30px",
    width: "15rem",
  };

  return (
    <>
      {isInput ? (
        <div style={styleBox}>
          <Title level={5} style={styleTitle}>
            {title}
          </Title>
          <InputNumber style={styleInputNumber} />
        </div>
      ) : (
        <div style={styleBox}>
          <Title level={5} style={styleTitle}>
            {title}
          </Title>
          <Input style={styleInputText} />
        </div>
      )}
    </>
  );
};

BoxInput.propTypes = {
  title: PropTypes.string,
  isInput: PropTypes.bool,
};

export default BoxInput;
