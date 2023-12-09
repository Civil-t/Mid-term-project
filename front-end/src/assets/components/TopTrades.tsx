import { useState } from "react";
import ReactApexChart from "react-apexcharts";

function TopTrades() {
  const [state, setState] = useState({
    series: [
      {
        data: [12.57, 11.93, 1.68, 1.16, 0.55],
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
        categories: ["GBP", "USD", "JPY", "EUR", "AUD"],
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
            categories: ["EUR/CAD", "AUD/CAD", "EUR/GBP", "NZD/CAD", "EUR/JPY"],
            tickAmount: 5,
            labels: {
              formatter: function (val) {
                return "$" + val; // Add dollar sign to each label
              },
            },
          },
          title: {
            text: "Top Trades",
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

export default TopTrades;
