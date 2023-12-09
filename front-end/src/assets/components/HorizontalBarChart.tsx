import { useState } from "react";
import ReactApexChart from "react-apexcharts";

function DailyPL() {
  const [state, setState] = useState({
    series: [
      {
        data: [40, 30, 40, 50, 60, 70, 60],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 20,
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          horizontal: true,
        },
      },

      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      },
    },
  });

  return (
    <div className="App" style={{ display: "flex", justifyContent: "center" }}>
      <ReactApexChart
        options={{
          chart: {
            type: "bar",
            height: 10,
          },
          plotOptions: {
            bar: {
              borderRadius: 1,
              horizontal: true,
              dataLabels: {
                position: "center",
              },
            },
          },
          colors: ["#39FF14"],
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            tickAmount: 5,
            labels: {
              formatter: function (val) {
                return "$" + val; // Add dollar sign to each label
              },
            },
          },
          title: {
            text: "Daily P&L",
            align: "center",
            margin: 4,
          },
        }}
        series={state.series}
        type="bar"
        height={200}
      />
    </div>
  );
}

export default DailyPL;
