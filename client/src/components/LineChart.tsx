import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { defaults } from 'chart.js/auto';
import api from '../api/axios';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

type UserPerDayData = Record<string, Record<string, number>>;

const UserPerDayChart = () => {
  const [userPerDay, setUserPerDay] = useState<UserPerDayData>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserPerDay = async () => {
      try {
        const res = await api.get('/stats/user-per-day');
        setUserPerDay(res.data);
      } catch (err) {
        console.error('Failed to fetch user per day data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserPerDay();
  }, []);

  if (loading)
    return <p className="text-center text-gray-500">Loading statistics...</p>;

  // Prepare data for Line chart
  const dates = Object.keys(userPerDay).sort();
  const users = Array.from(
    new Set(dates.flatMap((date) => Object.keys(userPerDay[date])))
  );

  const datasets = users.map((user, idx) => ({
    label: user,
    data: dates.map((date) => userPerDay[date][user] ?? null),
    borderColor: `hsl(${(idx * 60) % 360}, 70%, 50%)`,
    backgroundColor: `hsla(${(idx * 60) % 360}, 50%, 50%, 0.3)`,
    tension: 0.2,
    
  }));

  return (
    <div className="p-6">
      <div className="h-[250px]">
        <Line
          data={{
            labels: dates,
            datasets,
          }}
          options={{
            responsive: true,
            elements: { line: { tension: 0.3 } },
            plugins: {
              title: {
                display: true,
                text: 'User Playtime Per Day (Stacked)',
                color: '#FC64B6',
                font: { size: 18 },
              },
              tooltip: { mode: 'index', intersect: false },
            },
            interaction: { mode: 'nearest', axis: 'x', intersect: false },
            scales: {
              x: { 
                stacked: true,
                
               },

              y: { 
                stacked: true, 
                beginAtZero: true,
               },
            },
          }}
        />
      </div>
    </div>
  );
};

export default UserPerDayChart;
