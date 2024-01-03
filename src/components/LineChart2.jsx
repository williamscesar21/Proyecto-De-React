import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = ["Abril", "May", "Jun","Jul", "Agos","Sept"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Compras Mensuales",
      backgroundColor: "rgb(255, 0, 0 )",
      borderColor: "rgb(255, 0, 0 )",
      data: [20, 10, 15, 30, 20, 30].reverse(),
    },
  ],
};

const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false, 
        },
      },
    },
  };

const LineChart2 = () => {
  return (
    <div className="chart">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart2;