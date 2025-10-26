import { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { defaults } from 'chart.js/auto';
import api from '../api/axios';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

type LeaderboardEntry = {
  user: string;
  game: string;
  timePlayed: string; // e.g. "1 hours 30 minutes"
};

// 🎨 Custom color palette
const chartColors = [
  '#f15bb5',
  '#00A6F4',
  '#8457F6',
  '#00bb72',
  '#fee440',
  '#ff6f59',
  '#4361ee',
  '#48cae4',
  '#ff9f1c',
  '#80ed99',
];

// Helper: convert "X hours Y minutes" to total minutes
const parseTimePlayed = (timeStr: string): number => {
  const hoursMatch = timeStr.match(/(\d+)\s*hours?/);
  const minutesMatch = timeStr.match(/(\d+)\s*minutes?/);
  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
  const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
  return hours * 60 + minutes;
};

const LeaderboardChart = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await api.get('/stats/leaderboard');
        setLeaderboardData(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  const labels = leaderboardData.map((entry) => entry.user);
  const timeInMinutes = leaderboardData.map((entry) =>
    parseTimePlayed(entry.timePlayed)
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Time Played (minutes)',
        data: timeInMinutes,
        backgroundColor: chartColors.slice(0, labels.length),
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: { color: '#db2777', font: { size: 12 } },
      },
      title: {
        display: true,
        text: 'Leaderboard - Time Played per User',
        color: '#ec4899',
        font: { size: 18, weight: 'bold' as const },
      },
    },
  };

  return (
    <div className="p-6">
      <div className="h-[260px] flex justify-center items-center">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default LeaderboardChart;
