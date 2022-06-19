import {
  DeleteOutlined,
  EditOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, message, notification, Row, Table } from "antd";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { create, get, remove, update } from "../../api/bill";
import ConfirmModal from "../../component/ConfirmModal";
import Layout from "../../layout/layout";
import { bill } from "../../recoils/Atoms";
import ExportDetail from "./ExportDetail";
import style from "./style";

const { Search } = Input;
const DATE_FORMAT = "DD/MM/YYYY";
const FULL_DATE_FORMAT = "DD/MM/YYYY HH:mm";

const Export = () => {
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
      console.log(res);
      setData(res?.data?.items || []);
      setPagination({
        ...pagination,
        total: res?.data?.total || 0,
      });

      setLoading(false);
    },
    [pagination, search, setData]
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
        message.error({
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
      message.success("Xoá đơn nhập thành công");
      getData(1);
    } catch (err) {
      notification.error({
        message: err.message,
      });
    }
  }, [removeId, getData]);

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
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
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
      width: "30%",
      render: (_text, record) =>
        record.products.map((product) => (
          <div>
            {product.name}: {product.count}
          </div>
        )),
    },
    {
      title: "Tổng tiền",
      key: "price",
      width: "15%",
      render: (_text, record) =>
        record.products
          .map((product) => product.count * product.price)
          .reduce((curr, pre) => curr + pre),
    },
    {
      title: "Nhân viên",
      key: "staff",
      render: (_text, record) => record.staff?.name,
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
                type="warning"
                size="small"
                icon={<FilePdfOutlined />}
                onClick={() => print(record)}
              >
                Print
              </Button>
            </Col>
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
      <h2>Danh Sách Đơn Xuất Kho</h2>
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
            Thêm Hoá Đơn Xuất Kho
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
            // expandable={{
            //   expandedRowRender: (record) => (
            //     <div>
            //       <h5>PRODUCT LIST</h5>
            //       {!!record.products?.length ? (
            //         record.products.map((product) => (
            //           <div style={style.bold}>
            //             {product.name}: {product.count}
            //           </div>
            //         ))
            //       ) : (
            //         <span>No products.</span>
            //       )}
            //     </div>
            //   ),
            // }}
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
