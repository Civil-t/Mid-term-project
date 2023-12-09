import { useState } from "react";
import ReactApexChart from "react-apexcharts";

function NumberOfTrdaes() {
  const [state, setState] = useState({
    series: [
      {
        data: [4, 3, 1, 9, 6, 5],
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
          },
          title: {
            text: "Number of Trades",
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

export default NumberOfTrdaes;
