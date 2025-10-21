
import 'chart.js/auto';
import LeaderboardChart from '../components/LeaderboardChart';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import Leaderboard from '../components/Leaderboard';


export default function GameStatistics() {

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-pink-400">
        Game Statistics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md h-80">
          <BarChart />
        </div>

        {/* Stacked Line Chart: User Playtime Per Day */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md h-80">
          <LineChart />
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md h-80">
          <LeaderboardChart />
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md overflow-x-auto">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}
