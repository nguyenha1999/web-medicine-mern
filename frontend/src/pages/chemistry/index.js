import { CopyOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Input, message, Row, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { clone, create, get, remove, update } from "../../api/chemistry";
import ConfirmModal from "../../component/ConfirmModal";
import Layout from "../../layout/layout";
import { chemistry, RecipeAtom, UserInfoAtom } from "../../recoils/Atoms";
import ChemistryDetail from "./ChemistryDetail";
import ImageModal from "./ImageModal";
import style from "./style";

const { Search } = Input;

const Chemistry = () => {
  const history = useHistory();
  const [data, setData] = useRecoilState(chemistry);
  const setRecipe = useSetRecoilState(RecipeAtom);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [imageUrl, setImageUrl] = useState(null);
  const [removeId, setRemoveId] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const userInfo = useRecoilValue(UserInfoAtom);
  const { role } = userInfo;

  const getData = useCallback(
    async (page) => {
      setLoading(true);

      const res = await get(page, role, search);

      console.log(res?.data);

      setData(res?.data);

      setLoading(false);
    },
    [role, search, setData]
  );

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  const handleClone = useCallback(
    async (value) => {
      try {
        await clone(value);
        getData(1);
      } catch (error) {
        message.error("Clone thất bại");
      }
    },
    [getData]
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
          message.success(`${isEdit ? "Sửa" : "Thêm"} hoá chất thành công !!`);
          setEditingItem(null);
          getData(1);
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
      await remove({ _id: removeId, isDeleted: true, role: role });
      setRemoveId(null);
      message.success("Xoá hoá chất thành công !");
      getData(1);
    } catch (err) {
      message.error("Xoá thất bại");
    }
  }, [getData, removeId, role]);

  const onTableChange = (pagination) => setPagination(pagination);

  useEffect(() => {
    getData();
  }, [search, pagination.pageSize, getData]);

  const columns = [
    {
      title: "Mã hoá chất",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên hoá chất",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Nhà cung cấp chính",
      dataIndex: "partner",
      key: "partner",
    },
    {
      title: "Số lượng trong kho",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Thông tin hoá chất",
      key: "image",
      width: "15%",
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
          onClick={() => {
            setRecipe(record);
            history.push(`/recipe/${record.code}`);
          }}
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
                  borderRadius: "4px",
                }}
                size="small"
                icon={<CopyOutlined />}
                onClick={() => handleClone(record)}
              >
                Clone
              </Button>
            </Col>
            <Col span="auto">
              <Button
                style={{
                  backgroundColor: "#f56a00",
                  color: "#fff",
                  borderRadius: "4px",
                }}
                size="small"
                icon={<EditOutlined />}
                onClick={() => {
                  setEditingItem(record);
                }}
              >
                Sửa
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
      <h2>Danh Sách Hoá Chất</h2>
      <Row>
        <Col span={5}>
          <Button
            color="success"
            style={{
              background: "#319795",
              border: "1px solid #ccc",
              borderRadius: "4px",
              color: "#fff",
            }}
            onClick={() => {
              setEditingItem({
                name: "",
                use: "",
                imageUrl: "",
                price: "",
              });
            }}
          >
            THÊM HOÁ CHẤT
          </Button>
        </Col>
        <Col span={12} style={style.mb2}>
          <Search
            placeholder="Tìm kiếm"
            onSearch={(value) => setSearch(value.trim())}
            onChange={(e) => getData(1, role, e.target.value.trim())}
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
            rowClassName={(record) => record.isDeleted && "table-hidden"}
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
