import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Input, message, Row, Table } from "antd";
import "jspdf-autotable";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { create, get, remove, update } from "../../api/user";
import ConfirmModal from "../../component/ConfirmModal";
import Layout from "../../layout/layout";
import { chemistry, UserInfoAtom } from "../../recoils/Atoms";
import style from "./style";
import UserDetail from "./UserDetail";

const { Search } = Input;

const User = () => {
  const [data, setData] = useRecoilState(chemistry);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });
  const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
  const color = Math.floor(Math.random() * ColorList.length);

  const [removeId, setRemoveId] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const userInfo = useRecoilValue(UserInfoAtom);
  const { role } = userInfo;

  const getData = useCallback(
    async (page) => {
      setLoading(true);

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
        const resolve = await next(values);
        if (resolve.data.error) {
          throw new Error(resolve.data.message);
        } else {
          message.success(`${isEdit ? "Sửa" : "Thêm"} nhân viên thành công !!`);
          getData(1);
          setEditingItem(null);
        }
      } catch (error) {
        message.error(error.message);
      }
    },
    [editingItem, getData]
  );

  const onRemove = useCallback(async () => {
    if (!removeId) return;
    try {
      await remove(removeId, role);
      setRemoveId(null);
      message.success("Xoá nhân viên thành công");
      getData(1);
    } catch (err) {
      message.error(err.message);
    }
  }, [getData, removeId, role]);

  const onTableChange = (pagination) => setPagination(pagination);

  useEffect(() => {
    getData();
  }, [search, pagination.pageSize, getData]);

  const columns = [
    {
      title: "#",
      dataIndex: "_id",
      key: "_id",
      width: "5%",
      render: (_text, record) => (
        <Avatar
          className="custom-icon"
          size={40}
          icon={<UserOutlined />}
          style={{
            backgroundColor: ColorList[color],
            border: "2px solid #fff",
            fontSize: 14,
          }}
        />
      ),
    },
    {
      title: "Họ và tên",
      key: "username",
      dataIndex: "username",
      width: "10%",
    },
    {
      title: "Mã Nhân Viên",
      key: "code",
      dataIndex: "code",
      width: "10%",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      width: "25%",
    },
    {
      title: "Chức vụ",
      key: "value",
      dataIndex: "value",
      width: "15%",
    },
    {
      title: "Bộ Phận",
      key: "branch",
      dataIndex: "branch",
      width: "15%",
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
                style={{
                  backgroundColor: "#f56a00",
                  color: "#fff",
                  borderRadius: "4px",
                }}
                size="small"
                icon={<EditOutlined />}
                onClick={() => setEditingItem(record)}
              >
                Edit
              </Button>
            </Col>
            <Col span="auto">
              <Button
                type="danger"
                style={{
                  borderRadius: "4px",
                }}
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => setRemoveId(record._id)}
              >
                Delete
              </Button>
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <Layout>
      <h2>Danh Sách Nhân Viên</h2>
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
                createdAt: new Date().getTime(),
                isExport: false,
                products: [],
              })
            }
          >
            Thêm Nhân Viên
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
          />
        </Col>
      </Row>
      <ConfirmModal
        visible={!!removeId}
        title="Remove confirmation"
        message="Do you want to remove this bill?"
        onOk={onRemove}
        onCancel={() => setRemoveId(null)}
      />
      <UserDetail
        item={editingItem}
        onOk={updateData}
        onCancel={() => setEditingItem(null)}
      />
    </Layout>
  );
};

export default User;
