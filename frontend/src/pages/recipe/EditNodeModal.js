import {
  Button,
  Card,
  Col,
  Input,
  Modal,
  notification,
  Row,
  Select,
} from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { get } from "../../api/chemistry";
import { create } from "../../api/recipe";
import ChildrenTable from "./ChildrenTable";
import style from "./style";

const EditNodeModal = ({
  node,
  onOk,
  onOkRoot,
  onCancel,
  onRemove,
  data: dataRoot,
}) => {
  const [data, setData] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const codeRef = useRef();

  let arr;
  const getValue = useCallback(async () => {
    arr = await get();
  }, []);

  const { register, setValue, watch } = useForm();

  useEffect(() => {
    getValue();
  }, [getValue]);
  const [newChild, setNewChild] = useState({
    name: "",
    code: "",
    ratio: 0,
  });

  const { Option } = Select;

  const params = useParams();
  const { id } = params;

  const changeData = (objectValue) => {
    setData({
      ...data,
      ...objectValue,
    });
  };

  const changeNewChild = (objectValue) => {
    setNewChild({
      ...newChild,
      ...objectValue,
    });
  };

  const onAddChild = async () => {
    if (
      !newChild ||
      Object.values(newChild).some(
        (value) => !value || (typeof value === "string" && !value.trim())
      )
    )
      return;

    const newChildData = {
      ...newChild,
    };

    if (!data.code) {
      data.code = id;
    }

    setData({
      ...data,
      child: newChildData,
    });

    await create({ child: newChild, data });
    setNewChild({
      name: "",
      code: "",
      ratio: 0,
    });
  };

  const isRoot = node && !node.depth;

  const onConfirm = async () => {
    setConfirmLoading(true);
    try {
      const next = isRoot ? onOkRoot : onOk;

      await next(data);
    } catch (err) {
      notification.error({ message: err.message });
    }
    setConfirmLoading(false);
  };

  const renderAddChild = () => (
    <div>
      <Row gutter={8} style={style.mb2}>
        <Col span={8}>
          <h4>Tên Hoá Chất</h4>
          <Input
            value={newChild.name}
            onChange={(e) => changeNewChild({ name: e.target.value })}
            placeholder="Tên công thức"
          />
          {/* <Select {...register("childname")}>
            {Array.isArray(arr) &&
              arr.length > 0 &&
              arr.map((e) => {
                codeRef.current = e.code;
                return <Option value={e.code}>{e.name}</Option>;
              })}
          </Select> */}
        </Col>
        <Col span={8}>
          <h4>Mã Hoá Chất</h4>
          <Input
            value={newChild.code}
            // {...register("childcode")}
            // defaultValue={codeRef.current}
            onChange={(e) => changeNewChild({ code: e.target.value })}
            placeholder="Mã hoá chất"
          />
        </Col>
        <Col span={8}>
          <h4>Tỉ lệ</h4>
          <Input
            type="number"
            {...register("childratio")}
            value={newChild.ratio || ""}
            onChange={(e) => changeNewChild({ ratio: Number(e.target.value) })}
            placeholder="Tỉ lệ"
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Button size="small" type="primary" onClick={onAddChild}>
            Thêm hoá chất
          </Button>
        </Col>
      </Row>
    </div>
  );

  useEffect(() => {
    setNewChild({
      name: "",
      code: "",
      ratio: 0,
    });
    if (!node) {
      setData(null);
    } else {
      const newNode = {
        name: node?.data?.name,
        children: node?.data?.children,
      };
      if (!isRoot) {
        newNode.code = node?.data?.code;
        newNode.ratio = node?.data?.ratio;
      }
      setData(newNode);
    }
  }, [isRoot, node]);

  if (!data) return null;

  const normalFooter = [
    <Button key="back" size="small" onClick={onCancel}>
      Cancel
    </Button>,
    <Button key="submit" size="small" type="primary" onClick={onConfirm}>
      Submit
    </Button>,
  ];

  const footer = isRoot
    ? normalFooter
    : [
        ...normalFooter,
        <Button key="remove" type="danger" size="small" onClick={onRemove}>
          Remove node
        </Button>,
      ];

  return (
    <Modal
      visible={!!node}
      title={data.name}
      onOk={isRoot ? onOkRoot : onOk}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      footer={footer}
    >
      <div style={{ height: "400px", overflow: "auto" }}>
        <Card title="Information" style={style.mb2}>
          <div style={style.mb2}>
            <h3>Tên hoá chất</h3>
            <Input
              value={data?.name || ""}
              name="name"
              {...register("name")}
              onChange={(e) => changeData({ name: e.target.value })}
            />
            {!isRoot && (
              <>
                <h3>Mã hoá chất</h3>
                <Input
                  name="code"
                  {...register("code")}
                  value={data?.code || ""}
                  onChange={(e) => changeData({ code: e.target.value })}
                />

                <h3>Tỉ lệ</h3>
                <Input
                  type="number"
                  name="ratio"
                  {...register("ratio")}
                  value={data?.ratio || ""}
                  onChange={(e) =>
                    changeData({ ratio: Number(e.target.value) })
                  }
                />
              </>
            )}
          </div>
        </Card>

        <Card title="Children list">
          {!data.children || !data.children.length ? (
            renderAddChild()
          ) : (
            <div>
              <ChildrenTable children={data.children} />
              {renderAddChild()}
            </div>
          )}
        </Card>
      </div>
    </Modal>
  );
};

export default EditNodeModal;
