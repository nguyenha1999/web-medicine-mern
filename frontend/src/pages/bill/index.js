import {
  DeleteOutlined,
  EditOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, notification, Row, Table } from "antd";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { create, get, remove, update } from "../../api/bill";
import ConfirmModal from "../../component/ConfirmModal";
import Layout from "../../layout/layout";
import { bill } from "../../recoils/Atoms";
import BillDetail from "./BillDetail";
import style from "./style";

const { Search } = Input;
const DATE_FORMAT = "DD/MM/YYYY";
const FULL_DATE_FORMAT = "DD/MM/YYYY HH:mm";

const Bill = () => {
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
          message: `${isEdit ? "Update" : "Create"} chemistry successfully`,
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

  const print = (record) => {
    const PADDING = 10;
    const LINE_HEIGHT = 8;

    const { isExport, createdAt, staff, products } = record;

    const doc = new jsPDF({
      orientation: "portrait",
    });

    const timeType = isExport ? "Export time" : "Import time";
    const time = `${timeType}: ${moment(createdAt).format(FULL_DATE_FORMAT)}`;
    const staffId = `Staff ID: ${staff?._id}`;
    const staffName = `Staff name: ${staff?.name}`;

    let currentY = PADDING;
    doc.setFontSize(14);
    doc.text(isExport ? "EXPORT BILL" : "IMPORT BILL", PADDING, currentY);
    currentY += LINE_HEIGHT;
    doc.setFontSize(12);
    doc.text(time, PADDING, currentY);
    currentY += LINE_HEIGHT;
    doc.text(staffId, PADDING, currentY);
    currentY += LINE_HEIGHT;
    doc.text(staffName, PADDING, currentY);
    currentY += LINE_HEIGHT;
    doc.setFontSize(10);
    doc.text("Product list", PADDING, currentY);
    currentY += LINE_HEIGHT / 2;
    doc.autoTable({
      styles: {
        fontSize: 9,
      },
      startY: currentY,
      head: [["Id", "Name", "Quantity"]],
      body: products.map((product) => [
        product._id,
        product.name,
        product.count,
      ]),
      theme: "grid",
      rowPageBreak: "avoid",
    });
    doc.save(
      `${isExport ? "ExportBill" : "ImportBill"}-${moment(createdAt).format(
        DATE_FORMAT
      )}.pdf`
    );
  };

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
      title: "Time",
      key: "name",
      render: (_text, record) => moment(record.createdAt).format(DATE_FORMAT),
      width: "10%",
    },
    {
      title: "Type",
      key: "type",
      render: (_text, record) => (record.isExport ? "Export" : "Import"),
      width: "10%",
    },
    {
      title: "Staff",
      key: "staff",
      render: (_text, record) => record.staff?.name,
    },
    {
      title: "Action",
      key: "action",
      width: "30%",
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
      <h2>Bill list</h2>
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
            Create bill
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
            rowKey={(record) => record._id}
            columns={columns}
            dataSource={data}
            size="small"
            loading={loading}
            pagination={pagination}
            onChange={onTableChange}
            expandable={{
              expandedRowRender: (record) => (
                <div>
                  <h5>PRODUCT LIST</h5>
                  {!!record.products?.length ? (
                    record.products.map((product) => (
                      <div style={style.bold}>
                        {product.name}: {product.count}
                      </div>
                    ))
                  ) : (
                    <span>No products.</span>
                  )}
                </div>
              ),
            }}
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
      <BillDetail
        item={editingItem}
        onOk={updateData}
        onCancel={() => setEditingItem(null)}
      />
    </Layout>
  );
};

export default Bill;
