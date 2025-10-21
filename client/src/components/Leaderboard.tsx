import { useEffect, useState } from 'react';
import api from '../api/axios';

type LeaderboardEntry = {
  user: string;
  game: string;
  timePlayed: string;
};

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await api.get('/stats/leaderboard');
        setLeaderboardData(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="p-6 ">
      <h2 className="text-xl font-semibold text-pink-400 mb-3 text-center">
        Leaderboard
      </h2>
      <table className="min-w-full border border-gray-300 text-sm text-gray-800 dark:text-gray-100 rounded-lg overflow-hidden">
        <thead className="bg-pink-400 text-center text-white">
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
              className={`${
                index % 2 === 0
                  ? 'bg-pink-50 dark:bg-gray-800'
                  : 'bg-white dark:bg-gray-700'
              } hover:bg-pink-100 dark:hover:bg-gray-600 transition`}
            >
              <td className="py-2 px-4 border">{entry.user}</td>
              <td className="py-2 px-4 border">{entry.game}</td>
              <td className="py-2 px-4 border">{entry.timePlayed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
