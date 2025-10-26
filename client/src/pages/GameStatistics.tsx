import { useState, useEffect } from 'react';
import 'chart.js/auto';
import LeaderboardChart from '../components/LeaderboardChart';
import BarChartUserTotals from '../components/BarChartUserTotals';
import LineChart from '../components/LineChart';
import Leaderboard from '../components/Leaderboard'

export default function GameStatistics() {
  const [loadingBar, setLoadingBar] = useState(true);
  const [loadingLine, setLoadingLine] = useState(true);
  const [loadingDoughnut, setLoadingDoughnut] = useState(true);

  // Simulate data fetch delays for demonstration (replace with actual API calls if needed)
  useEffect(() => {
    const timers = [
      setTimeout(() => setLoadingBar(false), 500),
      setTimeout(() => setLoadingLine(false), 700),
      setTimeout(() => setLoadingDoughnut(false), 600),
    ];

    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-pink-400">
        Game Statistics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md h-80 flex items-center justify-center">
          {loadingBar ? (
            <p className="text-gray-500">Loading Bar Chart...</p>
          ) : (
            <BarChartUserTotals />
          )}
        </div>

        {/* Stacked Line Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md h-80 flex items-center justify-center">
          {loadingLine ? (
            <p className="text-gray-500">Loading Line Chart...</p>
          ) : (
            <LineChart />
          )}
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md h-80 flex items-center justify-center">
          {loadingDoughnut ? (
            <p className="text-gray-500">Loading Doughnut Chart...</p>
          ) : (
            <LeaderboardChart />
          )}
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md overflow-x-auto">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}
