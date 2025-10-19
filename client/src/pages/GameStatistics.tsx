import 'chart.js/auto';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import revenueData from '../data/usersPlayPerDay.json';
import leaderboardData from '../data/leaderboard.json';
import { defaults } from 'chart.js/auto';

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = 'center';
defaults.plugins.title.color = 'Pink';

export default function GameStatistics() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-pink-500">
        Game Statistics
      </h1>

      {/* Grid Layout: 2x2 */}
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
                  text: 'Overall Playtime Distribution',
                  color: 'Pink',
                  font: { size: 18 },
                },
              },
            }}
          />
        </div>

        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md h-80">
          <Line
            data={{
              labels: revenueData.map((data) => data.day),
              datasets: [
                {
                  label: 'Revenue',
                  data: revenueData.map((data) => data.revenue),
                  backgroundColor: '#4bc0c0',
                  borderColor: '#4bc0c0',
                },
                {
                  label: 'Cost',
                  data: revenueData.map((data) => data.cost),
                  backgroundColor: '#ff6384',
                  borderColor: '#ff6384',
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Revenue and Cost Trends',
                  color: 'Pink',
                  font: { size: 18 },
                },
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
                  color: 'Pink',
                  font: { size: 18 },
                },
              },
            }}
          />
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md overflow-x-auto">
          <h2 className="text-xl font-semibold text-pink-500 mb-3">
            Global Leaderboard
          </h2>
          <table className="min-w-full border border-gray-300 text-sm text-gray-800 dark:text-gray-100">
            <thead className="bg-pink-100 dark:bg-pink-900 text-left">
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
