import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { Button, notification } from "antd";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { remove } from "../../api/recipe";
import ConfirmModal from "../../component/ConfirmModal";
import Layout from "../../layout/layout";
import RecipeGroup from "./RecipeGroup";
import style from "./style";

const Recipe = () => {
  const history = useHistory();
  const { id } = useParams();
  const [visible, setVisible] = useState(false);

  console.log(id);

  const onRemove = async () => {
    try {
      await remove(id);
      notification.success({
        message: "Xoá công thức thành công",
      });
      history.push("/");
    } catch (err) {
      notification.error({
        message: err.message,
      });
    }
  };

  return (
    <Layout>
      <div style={style.container}>
        <div style={style.header}>
          <h2>{!!id ? "Công Thức" : "Thêm Công Thức"}</h2>
          {!!id && (
            <Button size="small" type="danger" onClick={() => setVisible(true)}>
              Xoá công thức
            </Button>
          )}
        </div>
        <ParentSize>
          {({ width, height }) => <RecipeGroup width={width} height={height} />}
        </ParentSize>
      </div>
      <ConfirmModal
        visible={visible}
        title="Xoá"
        message="Bạn có muốn xoá thành phần này?"
        onOk={onRemove}
        onCancel={() => setVisible(false)}
      />
    </Layout>
  );
};

export default Recipe;
