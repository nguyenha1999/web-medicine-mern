import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Input, notification, Row, Table } from "antd";
import "jspdf-autotable";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { create, get, remove, update } from "../../api/bill";
import ConfirmModal from "../../component/ConfirmModal";
import Layout from "../../layout/layout";
import { bill } from "../../recoils/Atoms";
import PartnerDetail from "./PartnerDetail";
import style from "./style";

const { Search } = Input;

const Import = () => {
  const [data, setData] = useRecoilState(bill);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 200,
  });

  const [removeId, setRemoveId] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const getData = useCallback(
    async (page) => {
      setLoading(true);

      // get data
      const { current, pageSize } = pagination;
      const res = await get(page || current, pageSize, search);
      setData(res?.data?.items || []);
      setPagination({
        ...pagination,
        total: res?.data?.total || 0,
      });

      setLoading(false);
    },
    [pagination, search]
  );

  const updateData = useCallback(
    async (values) => {
      if (!editingItem) return;
      const isEdit = !!editingItem?._id;
      const next = isEdit ? update : create;

      try {
        await next(values);
        setEditingItem(null);
        notification.success({
          message: `${isEdit ? "Sửa thông tin" : "Thêm"} Đối tác thành công  `,
        });
        getData(1);
      } catch (err) {
        notification.error({
          message: err.message,
        });
      }
    },
    [editingItem, getData]
  );

  const onRemove = useCallback(async () => {
    if (!removeId) return;
    try {
      await remove(removeId);
      setRemoveId(null);
      notification.success({
        message: "Xoá đối tác thành công!",
      });
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

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      width: "5%",
    },
    {
      title: "Tên Đối Tác",
      key: "nameCompany",
      dataIndex: "nameCompany",
      width: "10%",
    },
    {
      title: "Địa chỉ",
      key: "adress",
      width: "30%",
      dataIndex: "adress",
    },
    {
      title: "Hotline",
      key: "hotline",
      dataIndex: "hotline",
    },
    {
      title: "Sản Phẩm",
      key: "products",
      render: (_text, record) => (
        <div>
          {!!record.products?.length ? (
            record.products.map((product) => (
              <div style={style.bold}>{product.name}</div>
            ))
          ) : (
            <span>No products.</span>
          )}
        </div>
      ),
      width: "20%",
    },
    {
      title: "Hành động",
      key: "action",
      width: "25%",
      render: (_text, record) => {
        return (
          <Row gutter={8}>
            <Col span="auto">
              <Button
                type="primary"
                size="small"
                icon={<EditOutlined />}
                onClick={() => setEditingItem(record)}
              >
                Chỉnh sửa
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

  return (
    <Layout>
      <h2>Danh sách đối tác</h2>
      <Row style={style.mb2}>
        <Col span={4}>
          <Button
            color="success"
            onClick={() =>
              setEditingItem({
                adress: " ",
                hotline: " ",
                nameCompany: " ",
                products: [],
              })
            }
          >
            Thêm đối tác
          </Button>
        </Col>
        <Col span={12}>
          <Search
            placeholder="Search"
            onSearch={(value) => setSearch(value)}
            enterButton
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            style={{ textAlign: "center" }}
            rowKey={(record) => record._id}
            columns={columns}
            bordered
            dataSource={data}
            size="small"
            loading={loading}
            pagination={pagination}
            onChange={onTableChange}
            rowClassName={(record) => !record.enabled && "disabled-row"}
          />
        </Col>
      </Row>
      <ConfirmModal
        visible={!!removeId}
        title="Remove confirmation"
        message="Bạn có thực sự muốn xoá đối tác này?"
        onOk={onRemove}
        onCancel={() => setRemoveId(null)}
      />
      <PartnerDetail
        item={editingItem}
        onOk={updateData}
        onCancel={() => setEditingItem(null)}
      />
    </Layout>
  );
};

export default Import;
