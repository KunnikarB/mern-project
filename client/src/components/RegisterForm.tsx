import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { type User } from '../types';

interface RegisterFormProps {
  onSuccess?: (user: User) => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/users', { email, firstName, lastName });
      const user: User = res.data;

      if (photo) {
        const form = new FormData();
        form.append('photo', photo);
        await api.post(`/users/${user._id}/photo`, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      if (onSuccess) {
        onSuccess(user);
      } else {
        navigate(`/profile/${user._id}`);
      }
    } catch (err) {
      console.error(err);
      alert('Could not register user.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
        required
      />
      <input
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="input"
        required
      />
      <input
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="input"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
      />
      <button className="bg-pinkyDark text-white rounded-xl px-4 py-2 hover:bg-pink-600">
        Add User
      </button>
    </form>
  );
}
