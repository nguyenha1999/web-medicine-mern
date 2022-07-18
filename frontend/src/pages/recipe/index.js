import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { Button, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getById, remove } from "../../api/recipe";
import ConfirmModal from "../../component/ConfirmModal";
import Layout from "../../layout/layout";
import RecipeGroup from "./RecipeGroup";
import style from "./style";

const Recipe = () => {
  const history = useHistory();
  const { id } = useParams();
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);

  const getData = useCallback(async () => {
    if (!id) return;
    const res = await getById(id);
    setData(res.data);
  }, [id]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line no-use-before-define
  }, [getData, id]);

  const onRemove = async () => {
    try {
      await remove(id);
      message.success("Xoá công thức thành công");
      history.push("/");
    } catch (err) {
      message.error(err.message);
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
