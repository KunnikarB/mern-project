 
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import leaderboardData from '../data/leaderboard.json';
import { defaults } from 'chart.js/auto';
import { type User } from '../types';

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = 'center';
defaults.plugins.title.color = 'Pink';

type PlaySession = {
  gameId: string;
  minutesPlayed: number;
  date: string;
  gameName?: string;
};

export default function Profile() {

  const [loading, setLoading] = useState<boolean>(false);
  const [, setUsers] = useState<User[]>([]);
  const [, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [recentSession, setRecentSession] = useState<PlaySession | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return;
      try {
        const res = await api.get(`/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    const fetchRecentSession = async () => {
      if (!userId) return;
      try {
        const res = await api.get(`/sessions/${userId}`);
        const sessions: PlaySession[] = res.data;
        if (sessions.length > 0) {
          setRecentSession(sessions[0]);
        }
      } catch (err) {
        console.error('Failed to fetch recent session:', err);
      }
    };

    fetchUserProfile();
    fetchRecentSession();
  }, [userId]);

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-pink-500">
        {user.firstName} {user.lastName}'s Profile
      </h1>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => navigate('/users')}
          className="bg-pink-400 text-white px-4 py-2 rounded-2xl hover:bg-pink-500"
        >
          View Users
        </button>
        <button
          onClick={() => navigate(`/games/${userId}`)}
          className="bg-violet-500 text-white px-4 py-2 rounded-2xl hover:bg-violet-600"
        >
          Go to Games
        </button>
      </div>

      <div className="flex flex-col items-center mb-8">
        <img
          src={user.profileImage || '/default-avatar.png'}
          alt={user.firstName}
          className="w-24 h-24 rounded-full object-cover mb-3"
        />
        {recentSession ? (
          <>
            <p className='text-pink-500 text-3xl'>{recentSession.minutesPlayed} minutes.</p>
            <p className="text-sm dark:text-gray-400">
              Total Time Played <b>{recentSession.gameName}</b> for{' '}
            </p>
          </>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No play sessions recorded yet.
          </p>
        )}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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
              plugins: { title: { display: true, text: 'Games Played' } },
            }}
          />
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md overflow-x-auto">
          <h2 className="text-xl font-semibold text-pink-500 mb-3">
            Leaderboard
          </h2>
          <table className="min-w-full border border-gray-300 text-sm text-gray-800 dark:text-gray-100">
            <thead className="bg-pink-100 dark:bg-pink-900">
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
