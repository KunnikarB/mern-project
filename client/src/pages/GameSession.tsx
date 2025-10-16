import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';
import { type User } from '../types';

export default function GameSession() {
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const gameName = location.state?.gameName || '';
  const gameId = location.state?.gameId; // get game ID from state
  const [seconds, setSeconds] = useState(0);
  const [stopped, setStopped] = useState(false);
  const navigate = useNavigate();

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      try {
        const res = await api.get(`/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [userId]);

  // Timer
  useEffect(() => {
    if (stopped) return; // stop timer
    const interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [stopped]);

  const handleStop = async () => {
    setStopped(true);

    // Save to backend
    try {
      if (userId && gameId) {
        await api.post('/play-sessions', {
          user: userId,
          game: gameId,
          minutesPlayed: Math.floor(seconds / 60),
          date: new Date(),
        });
        console.log('Play session saved!');
      } else {
        console.error('Missing userId or gameId');
      }
    } catch (err) {
      console.error('Failed to save session:', err);
    }

    // Navigate to profile after 1 second so user sees the message
    setTimeout(() => {
      if (userId) navigate(`/profile/${userId}`);
    }, 2000);
  };

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min.toString().padStart(2, '0')}:${sec
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="p-6 relative min-h-[calc(100vh-128px)] flex flex-col items-center">
      {/* Game Header */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 mb-6 flex items-center gap-4 w-full max-w-md">
        <h2 className="text-3xl font-bold text-pinkyDark">{gameName}</h2>
        <p className="text-2xl font-mono ml-auto">{formatTime(seconds)}</p>
        <button
          onClick={handleStop}
          className="ml-4 bg-pinkyDark text-white px-4 py-2 rounded-lg hover:bg-pink-600"
        >
          Stop
        </button>
      </div>

      {/* Play info after stopping */}
      {stopped && (
        <div className="bg-pink-100 dark:bg-gray-700 text-pinkyDark dark:text-white rounded-lg p-4 mb-6 w-full max-w-md text-center font-semibold shadow-md">
          You played {seconds} seconds in {gameName}
        </div>
      )}

      {/* User info */}
      {user && (
        <div className="fixed bottom-6 right-6 flex items-center gap-2 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-3">
          <img
            src={user.profileImage ?? ''}
            alt={user.firstName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            {user.firstName} {user.lastName}
          </p>
        </div>
      )}
    </div>
  );
}
