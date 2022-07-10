import Highcharts from "highcharts";
import moment from "moment";
import { memo, useEffect, useRef } from "react";
import "./index.css";

export default memo(() => {
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
          data: [
            {
              name: "Hydro Sulphua",
              y: 62.74,
              drilldown: "Hydro Sulphua",
            },
            {
              name: "Axit Clohydric",
              y: 10.57,
              drilldown: "Axit Clohydric",
            },
            {
              name: "Axit Sulphuric",
              y: 7.23,
              drilldown: "Axit Sulphuric",
            },
            {
              name: "Nito",
              y: 5.58,
              drilldown: "Nito",
            },
            {
              name: "Oxy",
              y: 4.02,
              drilldown: "Oxy",
            },
            {
              name: "Clo",
              y: 1.92,
              drilldown: "Clo",
            },
            {
              name: "Loại khác",
              y: 7.62,
              drilldown: null,
            },
          ],
        },
      ],
    });
  });
  return <div ref={refContainer} />;
});
