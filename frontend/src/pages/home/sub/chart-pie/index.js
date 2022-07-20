import Highcharts from "highcharts";
import moment from "moment";
import { memo, useEffect, useRef } from "react";
import "./index.css";

export default memo((props) => {
  let { data } = props;

  const newData = data?.listChemExport
    ?.map((e) => {
      const ratio =
        (e.totalExportChemistryOfMounth / data.total[0].total) * 100;
      return {
        name: e._id,
        y: ratio,
        drilldown: e._id,
      };
    })
    .sort(function (a, b) {
      return b.y - a.y;
    });
  const refContainer = useRef();
  useEffect(() => {
    Highcharts.chart(refContainer.current, {
      chart: {
        type: "pie",
      },
      title: {
        text: `Tổng quan % số lượng hoá chất xuất kho tháng ${moment().format(
          "MM/YYYY"
        )} `,
      },

      accessibility: {
        announceNewData: {
          enabled: true,
        },
        point: {
          valueSuffix: "%",
        },
      },

      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: "{point.name}: {point.y:.1f}%",
          },
        },
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
      },

      series: [
        {
          name: "Chemistry",
          colorByPoint: true,
          data: newData,
        },
      ],
    });
  });
  return <div ref={refContainer} />;
});
