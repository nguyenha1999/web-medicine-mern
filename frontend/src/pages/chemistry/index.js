import { CopyOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Input, message, notification, Row, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { create, get, remove, update } from "../../api/chemistry";
import ConfirmModal from "../../component/ConfirmModal";
import Layout from "../../layout/layout";
import { chemistry } from "../../recoils/Atoms";
import ChemistryDetail from "./ChemistryDetail";
import ImageModal from "./ImageModal";
import style from "./style";

const { Search } = Input;

const Chemistry = () => {
  const history = useHistory();
  const [data, setData] = useRecoilState(chemistry);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 200,
  });

  const [imageUrl, setImageUrl] = useState(null);
  const [removeId, setRemoveId] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const getData = useCallback(
    async (page) => {
      setLoading(true);

      // get data
      const { current, pageSize } = pagination;
      const res = await get(page || current, pageSize, search);
      console.log(res);
      setData(res?.data.items || []);
      setPagination({
        ...pagination,
        total: res?.data?.total || 0,
      });

      setLoading(false);
    },
    [pagination, search]
  );

  const handleClone = useCallback(() => {
    message.success("Bạn đã clone Thành công nhé ");
  }, []);

  const updateData = useCallback(
    async (values) => {
      if (!editingItem) return;
      const isEdit = !!editingItem?._id;
      const next = isEdit ? update : create;

      try {
        await next(values);
        setEditingItem(null);
        // notification.success({
        //   message: `${isEdit ? "Update" : "Create"} chemistry successfully`,
        // });
        message.success(`${isEdit ? "Sửa" : "Thêm"} hoá chất thành công !!`);
        getData(1);
      } catch (err) {
        // notification.error({
        //   message: err.message,
        // });
        message.error(err.message);
      }
    },
    [editingItem, getData]
  );

  const onRemove = useCallback(async () => {
    if (!removeId) return;
    try {
      await remove(removeId);
      setRemoveId(null);
      // notification.success({
      //   message: "Remove chemistry successfully",
      // });
      message.success("Xoá hoá chất thành công !");
      getData(1);
    } catch (err) {
      notification.error({
        message: err.message,
      });
    }
  }, [removeId, getData]);

  const onTableChange = (pagination) => setPagination(pagination);

  useEffect(() => {
    getData();
  }, [search, pagination.current, pagination.pageSize]);

  console.log(data);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      width: "5%",
    },
    {
      title: "Tên hoá chất",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã hoá chất",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Sử dụng",
      dataIndex: "use",
      key: "use",
    },
    // {
    //   title: "Nhà cung cấp",
    //   dataIndex: "partner",
    //   key: "partner",
    // },
    {
      title: "Ảnh",
      key: "image",
      width: "10%",
      render: (_text, record) => (
        <Button
          type="link"
          size="small"
          onClick={() => setImageUrl(record.imageUrl)}
        >
          Ảnh hoá chất
        </Button>
      ),
    },
    {
      title: "Công thức",
      key: "recipe",
      width: "10%",
      render: (_text, record) => (
        <Button
          type="dashed"
          size="small"
          onClick={() =>
            history.push(
              `/recipe/${record._id}/${record.recipeId || "create-recipe"}`
            )
          }
        >
          Xem công thức
        </Button>
      ),
    },
    {
      title: "Hành Động",
      key: "action",
      width: "25%",
      render: (_text, record) => {
        return (
          <Row gutter={8}>
            <Col span="auto">
              <Button
                style={{
                  background: "#62a73b",
                  color: "#fff",
                }}
                size="small"
                icon={<CopyOutlined />}
                onClick={handleClone}
              >
                Clone
              </Button>
            </Col>
            <Col span="auto">
              <Button
                type="primary"
                size="small"
                icon={<EditOutlined />}
                onClick={() => setEditingItem(record)}
              >
                Sửa
              </Button>
            </Col>
            <Col span="auto">
              <Button
                type="danger"
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => setRemoveId(record._id)}
              >
                Xoá
              </Button>
            </Col>
          </Row>
        );
      },
    },
  ];

  console.log(data);

  return (
    <Layout>
      <h2>Danh Sách Hoá Chất</h2>
      <Row>
        <Col span={4}>
          <Button
            color="success"
            style={{
              background: "#319795",
              border: "1px solid #ccc",
              borderRadius: "4px",
              color: "#fff",
            }}
            onClick={() =>
              setEditingItem({
                name: "",
                use: "",
                imageUrl: "",
                price: "",
              })
            }
          >
            THÊM HOÁ CHẤT
          </Button>
        </Col>
        <Col span={12} style={style.mb2}>
          <Search
            placeholder="Tìm kiếm"
            onSearch={(value) => setSearch(value)}
            enterButton
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            rowKey={(record) => record._id}
            columns={columns}
            dataSource={data}
            bordered
            size="small"
            loading={loading}
            pagination={pagination}
            onChange={onTableChange}
            // rowClassName={(record, index) => (
            //   console.log(index),
            //   index % 2 !== 0 ? "table-row-light" : "table-row-dark"
            // )}
          />
        </Col>
      </Row>
      <ImageModal imageUrl={imageUrl} setImageUrl={setImageUrl} />
      <ConfirmModal
        visible={!!removeId}
        title="Xoá hoá chất"
        message="Bạn có thật sự muốn xoá hoá chất này?"
        onOk={onRemove}
        onCancel={() => setRemoveId(null)}
      />
      <ChemistryDetail
        item={editingItem}
        onOk={updateData}
        onCancel={() => setEditingItem(null)}
      />
    </Layout>
  );
};

export default Chemistry;
