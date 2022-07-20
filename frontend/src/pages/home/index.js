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

function getDataCurentMonth(data, key) {
  const dataCurentMonthIndex = data.findIndex(
    (item) => item.date === startOfMonthDmy
  );
  if (dataCurentMonthIndex !== -1) {
    return data
      .slice(dataCurentMonthIndex)
      .map((item) => (item[key] ? item[key] : 0));
  }
  return [];
}

function fillDataChart(data) {
  return {
    export: getDataCurentMonth(data.exportTrack, "count"),
    import: getDataCurentMonth(data.importTrack, "count"),
    exportTotal: getDataCurentMonth(data.exportTrack, "totalPrice"),
    importTotal: getDataCurentMonth(data.importTrack, "totalPrice"),
  };
}

const Home = () => {
  const [dataCarts, setDataCarts] = useState({});
  const [dataChartColumn, setDataChartColumn] = useState({});
  const [dataPie, setDataPie] = useState({});

  const getData = useCallback(async () => {
    const res = await get();
    setDataPie(res.data);
    setDataCarts(res.data);
    setDataChartColumn(fillDataChart(res.data));
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const { importTotal, exportTotal } = dataCarts ?? {};

  return (
    <Layout>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={6}>
            <CardOverview
              title={"Số đơn nhập"}
              icon={
                <DownloadOutlined style={{ fontSize: 30, color: "#16a085" }} />
              }
              action={"document"}
              data={importTotal && importTotal[0].countI}
            />
          </Col>
          <Col span={6}>
            <CardOverview
              title={"Số đơn xuất"}
              icon={
                <UploadOutlined style={{ fontSize: 30, color: "#2980b9" }} />
              }
              action={"procedure"}
              data={exportTotal && exportTotal[0].countE}
            />
          </Col>
          <Col span={6}>
            <CardOverview
              title={"Doanh thu"}
              icon={<HddFilled style={{ fontSize: 30, color: "#27ae60" }} />}
              action={"upload"}
              data={exportTotal && exportTotal[0].totalExported}
            />
          </Col>
          <Col span={6}>
            <CardOverview
              title={"Lợi nhuận"}
              icon={<BookFilled style={{ fontSize: 30, color: "#e67e22" }} />}
              action={"download"}
              data={dataCarts.y}
            />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: "8px" }}>
          <Col span={12}>
            <ColumnChart categories={listDates} data={dataChartColumn} />
          </Col>
          <Col span={12}>
            <PieChart data={dataPie} />
          </Col>
        </Row>
      </div>
    </Layout>
  );
};
export default Home;
