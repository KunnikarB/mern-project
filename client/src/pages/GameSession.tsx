import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';
import { type User } from '../types';

export default function GameSession() {
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const gameName = location.state?.gameName || '';
  const [seconds, setSeconds] = useState(0);
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
    const interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStop = () => {
    alert(`You played ${seconds} seconds in ${gameName}`);
    if (userId) {
      navigate(`/profile/${userId}`);
    } else {
      console.error('User ID not found');
    }
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
