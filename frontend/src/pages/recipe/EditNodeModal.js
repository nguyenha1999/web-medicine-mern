import { Button, Card, Col, Input, Modal, notification, Row } from "antd";
import { useEffect, useState } from "react";
import shortid from "shortid";
import ChildrenTable from "./ChildrenTable";
import style from "./style";

const EditNodeModal = ({ node, onOk, onOkRoot, onCancel, onRemove }) => {
  const [data, setData] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newChild, setNewChild] = useState({
    name: "",
    code: "",
    ratio: 0,
  });

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

  const onAddChild = () => {
    if (
      !newChild ||
      Object.values(newChild).some(
        (value) => !value || (typeof value === "string" && !value.trim())
      )
    )
      return;

    const newChildData = {
      ...newChild,
      _id: shortid.generate(),
      isNew: true,
    };

    if (data.children && data.children.length) {
      setData({
        ...data,
        children: [...data.children, newChildData],
      });
    } else {
      setData({
        ...data,
        children: [newChildData],
      });
    }

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
      if (!data) throw new Error("Invalid request");
      if (!data.name || !data.name.trim()) throw new Error("Name is empty");
      if (
        data.children
          .map((chil) => chil.ratio)
          .reduce((curr, pre) => curr + pre) > 100
      )
        throw new Error("Tỉ lệ không được vượt quá 100% ");
      if (!isRoot) {
        if (!data.code || !data.code.trim()) throw new Error("Code is empty");
        if (!data.ratio) throw new Error("Ratio must be greater than 0");
      }

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
        </Col>
        <Col span={8}>
          <h4>Mã Hoá Chất</h4>
          <Input
            value={newChild.code}
            onChange={(e) => changeNewChild({ code: e.target.value })}
            placeholder="Mã hoá chất"
          />
        </Col>
        <Col span={8}>
          <h4>Tỉ lệ</h4>
          <Input
            type="number"
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
  }, [node]);

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
              onChange={(e) => changeData({ name: e.target.value })}
            />
            {!isRoot && (
              <>
                <h3>Mã hoá chất</h3>
                <Input
                  value={data?.code || ""}
                  onChange={(e) => changeData({ code: e.target.value })}
                />

                <h3>Tỉ lệ</h3>
                <Input
                  type="number"
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
