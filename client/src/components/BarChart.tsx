import { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { defaults } from 'chart.js/auto';
import api from '../api/axios';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

type GameTotalData = {
  game: string;
  totalMinutes: number;
};

const BarChart = () => {
  const [gameTotal, setGameTotal] = useState<GameTotalData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGameTotals = async () => {
      try {
        
        const response = await api.get(
          '/stats/game-totals'
        );
        setGameTotal(response.data);
      } catch (error) {
        console.error('Error fetching game totals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameTotals();
  }, []);

  if (loading) return <p>Loading...</p>;

  const gameNames = gameTotal.map((item) => item.game);
  const totalMinutes = gameTotal.map((item) => item.totalMinutes);

  const data = {
    labels: gameNames,
    datasets: [
      {
        label: 'Total Minutes Played',
        data: totalMinutes,
        backgroundColor: ['#9b5de5', '#f15bb5', '#fee440', '#00bbf9'],
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: 'y' as const,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: 'Total Minutes Played for Each Game',
        color: '#FC64B6',
        font: { size: 18 },
      },
    },
  };

  return (
    <div className="p-6 shadow-md">
      <div className="h-60">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
