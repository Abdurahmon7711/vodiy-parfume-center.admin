import axios from "axios";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const Charts = () => {
  const [chartData, setChartData] = useState({});

  const chart = (data) => {
    setChartData({
      labels: data.dates.reverse(),
      datasets: [
        {
          label: "Oxirgi 10 kulik sotilgan mahsulotlar statistikasi",
          data: data.numbers.reverse(),
          backgroundColor: ["rgba(75,139,192,0.3)"],
          borderWidth: 2,
        },
      ],
    });
  };
  useEffect(() => {
    axios.get("/api/lastTenDayStatics/10").then((res) => chart(res.data));
  }, []);
  return (
    <div
      className="chart-diagram"
      style={{
        width: "1000px",
        minWidth: "500px",
        height: "auto",
        margin: "0 auto",
      }}
    >
      <Line
        data={chartData}
        options={{
          responsive: true,
          title: {
            display: true,
            text: "Chart JS",
          },
        }}
      />
    </div>
  );
};

export default Charts;
