import { useState } from "react";
import ReactApexChart from "react-apexcharts";

function BottomTrades() {
  const [state, setState] = useState({
    series: [
      {
        data: [13.22, 10.16, 7.68, 7.83, 7.24].reverse().map((num) => num * -1), // Reverse and make negative
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
        categories: ["GBP", "USD", "JPY", "EUR", "AUD"].reverse(),
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
          colors: ["#EA1D0A"],
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: [
              "GBP/NZD",
              "GBP/AUD",
              "AUD/CAD",
              "GBP/AUD",
              "GBP/USD",
            ].reverse(),
            tickAmount: 5,
          },
          title: {
            text: "Bottom Trades",
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

export default BottomTrades;
