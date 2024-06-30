import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { GlobalContext } from '../context/GlobalContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ConsumptionChart() {
  const { relatorios, loggedUser } = useContext(GlobalContext);
  const userRelatorios = relatorios.filter(rel => rel.userID === loggedUser.id);

  const sortedRelatorios = userRelatorios.sort((a, b) => new Date(a.mes) - new Date(b.mes));
  const labels = sortedRelatorios.map(rel => rel.mes);
  const data = sortedRelatorios.map(rel => rel.volume);

  let maxVolume = Math.max(...data);
  maxVolume = parseInt((maxVolume+10)/10)*10 // gambi pra setar o eixo no próximo múltiplo de 10

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Consumo de Água',
        data,
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: maxVolume, 
        title: {
          display: true,
          text: 'Volume de Consumo'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Meses'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Progresso do Consumo de Água',
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default ConsumptionChart;

