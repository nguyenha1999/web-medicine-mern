import Highcharts from "highcharts";
import moment from "moment";
import { memo, useEffect, useRef } from "react";
import "./index.css";

const currentDate = moment().format("HH:mm ngà\\y DD t\\háng MM nă\\m YYYY");

export default memo((props) => {
  let { categories, data } = props;
  const refContainer = useRef();
  useEffect(() => {
    Highcharts.chart(refContainer.current, {
      chart: {
        height: 285,
        type: "column",
        renderTo: "chart",
        defaultSeriesType: "areaspline",
      },
      title: {
        text: "Biểu đồ tổng quan số liệu trong tháng",
      },
      subtitle: {
        text: "Số liệu tính đến " + currentDate,
      },
      xAxis: {
        categories: categories,
        crosshair: true,
        minPadding: 0,
        minWidth: 1000,
        maxPadding: 0,
      },
      yAxis: {
        min: 0,
        title: {
          text: "Số lượt",
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: "Số đơn nhập",
          data: data.import,
        },
        {
          name: "Số đơn xuất",
          data: data.export,
        },
        {
          name: "Tổng thu",
          data: data.exportTotal,
        },
        {
          name: "Tổng chi",
          data: data.importTotal,
        },
      ],
    });
  });
  return (
    <div id="container">
      <div ref={refContainer} id="chart" style={{ width: "100% !important" }} />
    </div>
  );
});
