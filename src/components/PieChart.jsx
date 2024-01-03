// ./components/PieChart.js
import React from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const labels = ["Compradores", "Vendedores"];

const data = {
  labels: labels,
  datasets: [
    {
      backgroundColor: ["rgb(255, 0, 132)", "rgb(0, 0, 255)"],
      borderColor: "rgb(255, 255, 255)",
      data: [150, 200],
    },
  ],
};
const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };
const PieChart = () => {
  return (
    <div>
      <Pie className="pie" data={data} options={options} />
    </div>
  );
};
export default PieChart;