import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { type User } from '../types';

type Game = {
  _id: string;
  name: string;
  // extend with other fields from your backend schema if needed
};

type PlaySession = {
  minutesPlayed: number;
  game: Game;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Profile() {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [sessions, setSessions] = useState<PlaySession[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [recentPlay, setRecentPlay] = useState<string>('');
  const navigate = useNavigate();

  // Fetch user info
  useEffect(() => {
    if (!userId) return;
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [userId]);

  // Fetch games and sessions
  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      try {
        const [gamesRes, sessionsRes] = await Promise.all([
          api.get('/games'),
          api.get(`/play-sessions?user=${userId}`),
        ]);
        setGames(gamesRes.data);
        setSessions(sessionsRes.data);

        // Find the most recent session for the info message
        if (sessionsRes.data.length > 0) {
          const lastSession = sessionsRes.data[sessionsRes.data.length - 1];
          setRecentPlay(
            `You played ${lastSession.minutesPlayed * 60} seconds in ${
              lastSession.game.name
            }`
          );
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [userId]);

  // Chart data
  const chartData = {
    labels: games.map((g) => g.name),
    datasets: [
      {
        label: 'Minutes Played',
        data: games.map((g) => {
          const total = sessions
            .filter((s) => s.game._id === g._id)
            .reduce((acc, s) => acc + s.minutesPlayed, 0);
          return total;
        }),
        borderColor: '#ec4899', // pink-500
        backgroundColor: 'rgba(236, 72, 153, 0.2)',
      },
    ],
  };

  const totalMinutes = sessions.reduce((acc, s) => acc + s.minutesPlayed, 0);
  const gamesPlayed = games.filter((g) =>
    sessions.some((s) => s.game._id === g._id)
  ).length;
  const percentagePlayed =
    games.length > 0 ? Math.round((gamesPlayed / games.length) * 100) : 0;

  return (
    <div className="p-6 min-h-[calc(100vh-128px)] flex flex-col items-center gap-6">
      {/* User Info */}
      {user && (
        <div className="flex items-center gap-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 w-full max-w-3xl">
          <img
            src={user.profileImage ?? ''}
            alt={user.firstName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-pinkyDark">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
          </div>
        </div>
      )}

      {/* Recent Play Info */}
      {recentPlay && (
        <div className="bg-pink-100 dark:bg-gray-700 text-pinkyDark dark:text-white rounded-lg p-4 w-full max-w-3xl text-center font-semibold shadow-md">
          {recentPlay}
        </div>
      )}

      {/* Chart + Stats */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl">
        {/* Chart */}
        <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
          <Line data={chartData} />
        </div>

        {/* Stats */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg text-center">
            <p className="text-lg font-medium">Total Time Played</p>
            <p className="text-2xl font-bold">{totalMinutes} minutes</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg text-center">
            <p className="text-lg font-medium">Percentage of Games Played</p>
            <p className="text-2xl font-bold">{percentagePlayed}%</p>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => navigate('/users')}
              className="flex-1 bg-pinkyDark text-white rounded-xl px-4 py-2 hover:bg-pink-600"
            >
              Choose New Player
            </button>
            <button
              onClick={() => {
                if (userId) navigate(`/games/session`);
              }}
              className="flex-1 bg-pink-500 text-white rounded-xl px-4 py-2 hover:bg-pink-600"
            >
              Play New Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
