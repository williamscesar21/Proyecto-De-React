import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = ["Abril", "May", "Jun","Jul", "Agos","Sept"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Ventas Mensuales",
      backgroundColor: "rgb(31, 255, 0 )",
      borderColor: "rgb(31, 255, 0 )",
      data: [0, 10, 5, 2, 20, 30],
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

const LineChart = () => {
  return (
    <div className="chart">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;