import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, message, notification, Row, Table } from "antd";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { create, get, remove, update } from "../../api/export";
import ConfirmModal from "../../component/ConfirmModal";
import Layout from "../../layout/layout";
import { exports, UserInfoAtom } from "../../recoils/Atoms";
import ExportDetail from "./ExportDetail";
import style from "./style";

const { Search } = Input;
const DATE_FORMAT = "DD/MM/YYYY";
const FULL_DATE_FORMAT = "DD/MM/YYYY HH:mm";

const Export = () => {
  const [data, setData] = useRecoilState(exports);
  const [loading, setLoading] = useState(false);
  const userInfo = useRecoilValue(UserInfoAtom);
  const { role } = userInfo;

  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  const [removeId, setRemoveId] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const getData = useCallback(
    async (page) => {
      setLoading(true);

      // get data
      const { current, pageSize } = pagination;
      const res = await get(page, role || current, pageSize, search);
      setData(res?.data || []);

      setLoading(false);
    },
    [pagination, role, search, setData]
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
          `${isEdit ? "Chỉnh sửa" : "Thêm"} hoá đơn thành công!!`
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
      message.success("Xoá đơn nhập thành công");
      getData(1);
    } catch (err) {
      notification.error({
        message: err.message,
      });
    }
  }, [removeId, role, getData]);

  const onTableChange = (pagination) => setPagination(pagination);

  const print = (record) => {
    const PADDING = 10;
    const LINE_HEIGHT = 8;

    const { isExport, createdAt, products } = record;

    const doc = new jsPDF({
      orientation: "portrait",
    });

    const sum = products
      .map((product) => product.count * product.price)
      .reduce((curr, pre) => curr + pre);

    const timeType = isExport ? "Export Time" : "Import Time";
    const time = `${timeType}: ${moment(createdAt).format(FULL_DATE_FORMAT)}`;
    const staffId = `StaffID: 621126`;
    const staffName = `StaffName: Le Ngoc Ha`;
    const sumValue = `SumValue: ${sum}`;

    let currentY = PADDING;
    doc.setFontSize(14);
    doc.text(isExport ? "Export Bill" : "Import Bill", PADDING, currentY);
    currentY += LINE_HEIGHT;
    doc.setFontSize(12);
    doc.text(time, PADDING, currentY);
    currentY += LINE_HEIGHT;
    doc.text(staffId, PADDING, currentY);
    currentY += LINE_HEIGHT;
    doc.text(staffName, PADDING, currentY);
    currentY += LINE_HEIGHT;
    doc.setFontSize(10);
    doc.text("Products List", PADDING, currentY);
    currentY += LINE_HEIGHT / 2;
    doc.autoTable({
      styles: {
        fontSize: 9,
      },
      startY: currentY,
      head: [["ID", "Products", "Quantity", "Price/Product", "Value"]],
      body: products.map((product) => [
        product._id,
        product.name,
        product.count,
        product.price,
        product.count * product.price,
      ]),
      theme: "grid",
      rowPageBreak: "avoid",
    });
    currentY += LINE_HEIGHT * 6;
    doc.text(sumValue, PADDING, currentY);
    doc.save(
      `${isExport ? "Đơn Xuất" : "Đơn Nhập"}-${moment(createdAt).format(
        DATE_FORMAT
      )}.pdf`
    );
  };

  useEffect(() => {
    getData();
  }, [getData]);

  const columns = [
    {
      title: "ID",
      dataIndex: "code",
      key: "code",
      width: "5%",
    },
    {
      title: "Thời gian",
      key: "name",
      render: (_text, record) => moment(record.createdAt).format(DATE_FORMAT),
      width: "10%",
    },
    {
      title: "Sản phẩm",
      key: "products",
      width: "20%",
      render: (_text, record) =>
        record.products.map((product) => (
          <div>
            {product.name}: {product.count}
          </div>
        )),
    },
    {
      title: "Tổng tiền",
      key: "totalPrice",
      dataIndex: "totalPrice",
      width: "15%",
    },
    {
      title: "Nhân viên",
      key: "staffs",
      render: (_text, record) => record.staffs[0].username,
      width: "15%",
    },
    {
      title: "Hành động",
      key: "action",
      width: "35%",
      render: (_text, record) => {
        return (
          <Row gutter={8}>
            <Col span="auto">
              <Button
                type="warning"
                size="small"
                style={{
                  borderRadius: "4px",
                }}
                icon={<FilePdfOutlined />}
                onClick={() => print(record)}
              >
                Print
              </Button>
            </Col>
            <Col span="auto">
              <Button
                style={{
                  background: "#62a73b",
                  color: "#fff",
                  borderRadius: "4px",
                }}
                size="small"
                icon={<CopyOutlined />}
              >
                History
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
      <h2>Danh Sách Đơn Xuất Kho</h2>
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
            onClick={() => {
              setEditingItem({
                createdAt: new Date().getTime(),
                isExport: false,
                products: [],
              });
            }}
          >
            THÊM HOÁ ĐƠN XUẤT
          </Button>
        </Col>
        <Col span={12} style={style.mb2}>
          <Search
            placeholder="Tìm kiếm"
            onSearch={(value) => setSearch(value)}
            onChange={(e) => getData(1, role, e.target.value)}
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
        title="Xoá hoá đơn xuất kho"
        message="Bạn có thật sự muốn xoá hoá đơn này?"
        onOk={onRemove}
        onCancel={() => setRemoveId(null)}
      />
      <ExportDetail
        item={editingItem}
        onOk={updateData}
        onCancel={() => setEditingItem(null)}
      />
    </Layout>
  );
};

export default Export;
