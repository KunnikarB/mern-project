import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { defaults } from 'chart.js/auto';
import { type User } from '../types';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

type PlaySession = {
  gameId: string;
  minutesPlayed: number;
  date: string;
  game?: {
    id: string;
    name: string;
  };
};

export default function Profile() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<User | null>(null);
  const [sessions, setSessions] = useState<PlaySession[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const recentSession: PlaySession | null = location.state?.recentSession || null;

  const pinkColors = [
    '#f15bb5',
    '#fc64b6',
    '#ff85a2',
    '#ff477e',
    '#ff5c8d',
    '#ff77a9',
  ];

  // Fetch user info
  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  // Fetch user sessions
  useEffect(() => {
    if (!userId) return;
    const fetchSessions = async () => {
      try {
        const res = await api.get(`/sessions/${userId}`);
        setSessions(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch sessions');
      }
    };
    fetchSessions();
  }, [userId, location.key]);

  if (loading)
    return <p className="text-center text-gray-500">Loading profile...</p>;
  if (!user) return <p className="text-center text-gray-500">User not found</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Merge recent session into sessions for chart
  const allSessions = recentSession
    ? [
        {
          ...recentSession,
          game: recentSession.game ?? {
            id: recentSession.gameId,
            name: `Game ${recentSession.gameId}`,
          },
        },
        ...sessions,
      ]
    : sessions;


  const totalMinutes = allSessions.reduce((sum, s) => sum + s.minutesPlayed, 0);

  return (
    <div className="p-6">
      {/* User Info */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={user.profileImage || '/default-avatar.png'}
          alt={user.firstName}
          className="w-24 h-24 rounded-full object-cover mb-3"
        />
        <h1 className="text-3xl font-bold text-center mb-1 text-pink-500">
          {user.firstName} {user.lastName}'s Profile
        </h1>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md h-[300px]">
          {allSessions.length > 0 ? (
            <Bar
              data={{
                labels: allSessions.map(
                  (s) => s.game?.name || `Game ${s.gameId}`
                ),
                datasets: [
                  {
                    label: 'Minutes Played',
                    data: allSessions.map((s) => s.minutesPlayed),
                    backgroundColor: allSessions.map(
                      (_, idx) => pinkColors[idx % pinkColors.length]
                    ),
                  },
                ],
              }}
              options={{
                indexAxis: 'y',
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: 'Games Played',
                    color: '#FC64B6',
                    font: { size: 18 },
                    position: 'bottom',
                  },
                  legend: { display: false },
                },
                scales: {
                  x: { beginAtZero: true, ticks: { color: '#fc64b6' } },
                  y: { ticks: { color: '#fc64b6' } },
                },
              }}
            />
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center mt-20">
              No sessions to display
            </p>
          )}
        </div>

        {/* Session Summary */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md flex flex-col items-center justify-center">
          {allSessions.length > 0 ? (
            <>
              <h2 className="text-pink-500 text-5xl mb-2">{totalMinutes}</h2>
              <p className="text-sm dark:text-gray-400">
                Total minutes played across {allSessions.length} sessions
              </p>
            </>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No play sessions recorded yet.
            </p>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-6">
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
