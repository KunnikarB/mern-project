import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { type User } from '../types';

export default function Profile() {
  const { id } = useParams<{ id: string }>(); // must match route param
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      try {
        const res = await api.get(`/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>👤 User not found</p>;

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={user.profileImage ?? ''}
          alt={user.firstName}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold text-pinkyDark">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
      {/* Add other profile info here */}
      <p>Welcome to 👤 {user.firstName}'s profile</p>
  
    </div>
  );
}
