import { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import leaderboardData from '../data/leaderboard.json';
import { defaults } from 'chart.js/auto';
import api from '../api/axios';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

type UserPerDayData = Record<string, Record<string, number>>;

export default function GameStatistics() {
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

  if (loading) return <p>Loading statistics...</p>;

  const dates = Object.keys(userPerDay).sort();
  const users = Array.from(
    new Set(dates.flatMap((date) => Object.keys(userPerDay[date])))
  );

  // Prepare datasets for stacked Line chart
  const datasets = users.map((user, idx) => ({
    label: user,
    data: dates.map((date) => userPerDay[date][user] || 0),
    borderColor: `hsl(${(idx * 60) % 360}, 70%, 50%)`,
    backgroundColor: `hsla(${(idx * 60) % 360}, 70%, 50%, 0.3)`,
    fill: true,
    tension: 0.3,
  }));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-pink-400">
        Game Statistics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Doughnut Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md h-80">
          <Doughnut
            data={{
              labels: ['Chess', 'Sudoku', 'Tetris', 'Tic-Tac-Toe'],
              datasets: [
                {
                  label: 'User Data',
                  data: [65, 59, 80, 81],
                  backgroundColor: [
                    'rgba(43, 63, 229, 0.8)',
                    'rgba(250, 192, 19, 0.8)',
                    'rgba(253, 135, 135, 0.8)',
                    'rgba(75, 192, 192, 0.2)',
                  ],
                  borderColor: [
                    'rgba(43, 63, 229, 0.8)',
                    'rgba(250, 192, 19, 0.8)',
                    'rgba(253, 135, 135, 0.8)',
                    'rgba(75, 192, 192, 0.2)',
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Time Played',
                  color: '#FC64B6',
                  font: { size: 18 },
                  position: 'bottom',
                },
              },
            }}
          />
        </div>

        {/* Stacked Line Chart: User Playtime Per Day */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md h-80">
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
                x: { stacked: true },
                y: { stacked: true, beginAtZero: true },
              },
            }}
          />
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md h-80">
          <Bar
            data={{
              labels: ['Chess', 'Sudoku', 'Tetris', 'Tic-Tac-Toe'],
              datasets: [
                {
                  label: 'Games Played',
                  data: [65, 59, 80, 81],
                  backgroundColor: [
                    'rgba(43, 63, 229, 0.8)',
                    'rgba(250, 192, 19, 0.8)',
                    'rgba(253, 135, 135, 0.8)',
                    'rgba(75, 192, 192, 0.2)',
                  ],
                },
              ],
            }}
            options={{
              indexAxis: 'y',
              plugins: {
                title: {
                  display: true,
                  text: 'Games Played Overview',
                  color: '#FC64B6',
                  font: { size: 18 },
                },
              },
            }}
          />
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md overflow-x-auto">
          <h2 className="text-xl font-semibold text-pink-400 mb-3 text-center">
            Leaderboard
          </h2>
          <table className="min-w-full border border-gray-300 text-sm text-gray-800 dark:text-gray-100">
            <thead className="bg-pink-400 text-left">
              <tr>
                <th className="py-2 px-4 border">User</th>
                <th className="py-2 px-4 border">Game</th>
                <th className="py-2 px-4 border">Time Played</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry, index) => (
                <tr
                  key={index}
                  className="hover:bg-pink-50 dark:hover:bg-gray-700"
                >
                  <td className="py-2 px-4 border">{entry.user}</td>
                  <td className="py-2 px-4 border">{entry.game}</td>
                  <td className="py-2 px-4 border">{entry.timePlayed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
