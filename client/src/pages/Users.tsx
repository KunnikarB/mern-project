import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import RegisterForm from '../components/RegisterForm';
import { type User } from '../types';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

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

  const handleUserAdded = (newUser: User) => {
    setUsers((prev) => [newUser, ...prev]);
    setShowForm(false);
  };

  // Navigate to Games page with userId
  const handlePlayGame = (userId: string) => {
    navigate(`/games/${userId}`);
  };

  return (
    <div className="p-6 min-h-[calc(100vh-128px)]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-pinkyDark">Users</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-pinkyDark text-white px-4 py-2 rounded-lg hover:bg-pink-600"
        >
          Add New User
        </button>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-pinkyDark font-bold">
                    {(user.firstName?.[0] ?? '').toUpperCase()}
                  </span>
                )}
              </div>
              <p className="font-semibold text-gray-800 dark:text-gray-200 text-center">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                {user.email}
              </p>
              <button
                onClick={() => handlePlayGame(user._id)}
                className="mt-2 bg-pinkyDark text-white px-4 py-2 rounded-lg hover:bg-pink-600"
              >
                Play Game
              </button>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => setShowForm(false)}
            >
              ✖
            </button>
            <h3 className="text-xl font-semibold mb-4 text-pinkyDark">
              Add New User
            </h3>
            <RegisterForm onSuccess={handleUserAdded} />
          </div>
        </div>
      )}
    </div>
  );
}
