import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Input,
  message,
  notification,
  Row,
  Table,
} from "antd";
import "jspdf-autotable";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { create, get, remove, update } from "../../api/chemistry";
import ConfirmModal from "../../component/ConfirmModal";
import Layout from "../../layout/layout";
import { chemistry } from "../../recoils/Atoms";
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
    total: 200,
  });
  const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
  const color = Math.floor(Math.random() * ColorList.length);

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
        if (values.Id === "621126") {
          message.error(`Mã Nhân Viên đã tồn tại`);
        } else {
          notification.success({
            message: `${isEdit ? "Update" : "Create"} user successfully`,
          });
          getData(1);
        }
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
        message: "Remove bill successfully",
      });
      getData(1);
    } catch (err) {
      notification.error({
        message: err.message,
      });
    }
  }, [removeId, getData]);

  const onTableChange = (pagination) => setPagination(pagination);

  console.log(color);

  useEffect(() => {
    getData();
  }, [search, pagination.current, pagination.pageSize]);

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
      key: "name",
      dataIndex: "nameUser",
      width: "10%",
    },
    {
      title: "Mã Nhân Viên",
      key: "name",
      dataIndex: "Id",
      width: "10%",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "emailUser",
      width: "25%",
    },
    {
      title: "Chức vụ",
      key: "vlue",
      dataIndex: "vlue",
      width: "15%",
    },
    {
      title: "Bộ Phận",
      key: "staff",
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
                type="primary"
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
        <Col span={4}>
          <Button
            color="success"
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
