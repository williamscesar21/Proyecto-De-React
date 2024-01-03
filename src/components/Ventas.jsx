import React from 'react';
import { Bar } from 'react-chartjs-2';

const EstadisticasVentas = () => {
  const data = {
    labels: ['Ventas del Mes', 'Nuevos Clientes', 'Productos Vendidos'],
    datasets: [
      {
        label: 'Estadísticas de Ventas',
        data: [1500, 30, 200],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 205, 86, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 205, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="estadisticas-container">
      <h2>Estadísticas de Ventas del Mes</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default EstadisticasVentas;
