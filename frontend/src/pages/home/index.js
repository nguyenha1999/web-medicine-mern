import {
  BookFilled,
  DownloadOutlined,
  HddFilled,
  UploadOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { get } from "../../api/home";
import Layout from "../../layout/layout.js";
import CardOverview from "./sub/card.js";
import ColumnChart from "./sub/chart-column.js/index.js";
import PieChart from "./sub/chart-pie";

const enumerateDaysBetweenDates = function (startDate, endDate) {
  var dates = [];
  var currDate = moment(startDate).startOf("day");
  var lastDate = moment(endDate).startOf("day");
  while (currDate.add(1, "days").diff(lastDate) < 0) {
    dates.push(currDate.clone().toDate());
  }
  return dates;
};

const startOfMonth = moment()
  .clone()
  .startOf("month")
  .format("YYYY-MM-DD hh:mm");
const startOfMonthDmy = moment().clone().startOf("month").format("YYYY-MM-DD");
const listDates = enumerateDaysBetweenDates(
  moment(startOfMonth).add(-1, "d"),
  moment().add(1, "d")
).map((item) => moment(item).format("DD/MM/YYYY"));

function getDataCurentMonth(data) {
  const dataCurentMonthIndex = data.findIndex(
    (item) => item.date === startOfMonthDmy
  );
  if (dataCurentMonthIndex !== -1) {
    return data.slice(dataCurentMonthIndex).map((item) => item.count);
  }
  return [];
}

function fillDataChart(data) {
  return {
    document: getDataCurentMonth(6),
    procedure: getDataCurentMonth(7),
    upload: getDataCurentMonth(8),
    download: getDataCurentMonth(9),
  };
}

const Home = () => {
  const [dataCarts, setDataCarts] = useState({});
  const [dataChart, setDataChart] = useState({});

  const getData = useCallback(async () => {
    const res = await get();
    console.log(res);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Layout>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={6}>
            <CardOverview
              title={"Số đơn nhập"}
              icon={<BookFilled style={{ fontSize: 30, color: "#16a085" }} />}
              action={"document"}
              data={dataCarts.document}
            />
          </Col>
          <Col span={6}>
            <CardOverview
              title={"Số đơn xuất"}
              icon={<HddFilled style={{ fontSize: 30, color: "#2980b9" }} />}
              action={"procedure"}
              data={dataCarts.procedure}
            />
          </Col>
          <Col span={6}>
            <CardOverview
              title={"Doanh thu"}
              icon={
                <UploadOutlined style={{ fontSize: 30, color: "#27ae60" }} />
              }
              action={"upload"}
              data={dataCarts.upload}
            />
          </Col>
          <Col span={6}>
            <CardOverview
              title={"Lợi nhuận"}
              icon={
                <DownloadOutlined style={{ fontSize: 30, color: "#e67e22" }} />
              }
              action={"download"}
              data={dataCarts.download}
            />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: "8px" }}>
          <Col span={12}>
            <ColumnChart />
          </Col>
          <Col span={12}>
            {" "}
            <PieChart />
          </Col>
        </Row>
      </div>
    </Layout>
  );
};
export default Home;
