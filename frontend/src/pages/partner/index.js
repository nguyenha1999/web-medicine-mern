import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Input, message, Row, Table } from "antd";
import "jspdf-autotable";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { create, get, remove, update } from "../../api/partner";
import ConfirmModal from "../../component/ConfirmModal";
import Layout from "../../layout/layout";
import { partner, UserInfoAtom } from "../../recoils/Atoms";
import PartnerDetail from "./PartnerDetail";
import style from "./style";

const { Search } = Input;

const Partner = () => {
  const [data, setData] = useRecoilState(partner);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    // total: 200,
  });

  const [removeId, setRemoveId] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const userInfo = useRecoilValue(UserInfoAtom);
  const { role } = userInfo;

  const getData = useCallback(
    async (page) => {
      setLoading(true);

      // get data

      const res = await get(page, role, search);
      setData(res?.data || []);

      setLoading(false);
    },
    [role, search, setData]
  );

  const updateData = useCallback(
    async (values) => {
      if (!editingItem) return;
      const isEdit = !!editingItem?._id;
      const next = isEdit ? update : create;

      try {
        await next(values);
        setEditingItem(null);
        message.success(
          `${isEdit ? "Sửa thông tin" : "Thêm"} Đối tác thành công  `
        );
        getData(1);
      } catch (err) {
        message.error(err.message);
      }
    },
    [editingItem, getData]
  );

  const onRemove = useCallback(async () => {
    if (!removeId) return;
    try {
      await remove(removeId, role);
      setRemoveId(null);
      message.success("Xoá đối tác thành công!");
      getData(1);
    } catch (err) {
      message.error(err.message);
    }
  }, [removeId, role, getData]);

  const onTableChange = (pagination) => setPagination(pagination);

  useEffect(() => {
    getData();
  }, [search, pagination.pageSize, getData]);

  const columns = [
    {
      title: "ID",
      dataIndex: "code",
      key: "code",
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
      key: "address",
      width: "30%",
      dataIndex: "address",
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
          {Array.isArray(record.products) && record.products?.length > 0 ? (
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
        <Col span={5}>
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
            onSearch={(value) => setSearch(value.trim())}
            onChange={(e) => getData(1, role, e.target.value.trim())}
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
            rowClassName={(record) => record.isDeleted && "table-hidden"}
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

export default Partner;
