import { useEffect, useState } from 'react';
import axios from 'axios';

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
};

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:3000/users');
        setUsers(res.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError('Failed to fetch users');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      {users.map((user) => (
        <div key={user._id} className="flex items-center space-x-4 mb-2">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p>
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
