import { Table } from "antd";
import React from "react";
import style from "./style";

const ChildrenTable = ({ children }) => {
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "Mã hoá chất",
      dataIndex: "code",
      key: "code",
      editable: true,
    },
    {
      title: "Tỉ lệ",
      dataIndex: "ratio",
      key: "ratio",
      editable: true,
    },
  ];

  return (
    <Table
      rowKey={(record) => record._id}
      bordered
      columns={columns}
      dataSource={children}
      size="small"
      pagination={false}
      style={style.mb2}
      scroll={{ y: 120 }}
    />
  );
};

export default ChildrenTable;
