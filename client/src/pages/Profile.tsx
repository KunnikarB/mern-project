 
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
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

  const sessionData: PlaySession[] = [
    { gameId: '1', minutesPlayed: 120, date: '2024-10-01', gameName: 'Chess' },
    { gameId: '2', minutesPlayed: 90, date: '2024-10-02', gameName: 'Sudoku' },
    { gameId: '3', minutesPlayed: 150, date: '2024-10-03', gameName: 'Tetris' },
    { gameId: '4', minutesPlayed: 80, date: '2024-10-04', gameName: 'Tic-Tac-Toe' },
  ];

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="p-6">
      {/* User Info */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={user.profileImage || '/default-avatar.png'}
          alt={user.firstName}
          className="w-24 h-24 rounded-full object-cover mb-3"
        />
      </div>
      <h1 className="text-3xl font-bold text-center mb-6 text-pink-500">
        {user.firstName} {user.lastName}'s Profile
      </h1>

      {/* Charts section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md h-80">
          <Bar
            data={{
              labels: sessionData.map((session) => session.gameName),
              datasets: [
                {
                  label: 'Games Played',
                  data: sessionData.map((session) => session.minutesPlayed),
                  backgroundColor: ['#f15bb5', '#fee440', '#00bbf9', '#00f5d4'],
                },
              ],
            }}
            options={{
              indexAxis: 'y',
              plugins: {
                title: {
                  display: true,
                  text: 'Games Played',
                  color: '#FC64B6',
                  font: { size: 18 },
                  position: 'bottom',
                },
              },
            }}
          />
        </div>

        {/* Session Details */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
          <div className="mb-20 *:mt-4 flex flex-col items-center">
            {recentSession ? (
              <>
                <h2 className="text-pink-500 text-5xl">
                  {recentSession.minutesPlayed} minutes.
                </h2>
                <p className="text-sm dark:text-gray-400">
                  Total Time Played {recentSession.gameName}
                </p>
              </>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No play sessions recorded yet.
              </p>
            )}
          </div>
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
        </div>
      </div>
    </div>
  );
}
