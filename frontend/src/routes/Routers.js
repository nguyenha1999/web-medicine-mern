import { Skeleton } from "antd";
import PropTypes from "prop-types";
import { Suspense } from "react";

const Routers = (props) => {
  const { component } = props;
  return <Suspense fallback={<Skeleton />}>{component}</Suspense>;
};

Routers.propTypes = {
  component: PropTypes.node,
};

export default Routers;
