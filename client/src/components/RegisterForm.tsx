import { useState, useRef } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { type User } from '../types';

interface RegisterFormProps {
  onSuccess?: (user: User) => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const photoRef = useRef<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // If no photo is provided, generate a DiceBear avatar and include it in the initial create.
      let profileImage: string | undefined;
      if (!photoRef.current) {
        const seed = `${firstName}-${lastName}-${Math.random()
          .toString(36)
          .substring(2, 7)}`;
        profileImage = `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`;
      }

      // Create the user (include profileImage if generated)
      const res = await api.post('/users', {
        email,
        firstName,
        lastName,
        ...(profileImage ? { profileImage } : {}),
      });
      const user: User = res.data;

      // If a photo file was provided, upload it to the profile endpoint
      if (photoRef.current) {
        try {
          const form = new FormData();
          form.append('photo', photoRef.current);
          await api.post(`/profile/${user._id}/photo`, form, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        } catch (err) {
          console.error('Failed to upload photo:', err);
          // continue — user was created, photo upload failed
        }
      }

      console.log('User created:', user);
      alert('User created successfully!');

      if (onSuccess) {
        onSuccess(user);
      } else {
        navigate(`/users`);
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
        onChange={(e) => {
          photoRef.current = e.target.files?.[0] ?? null;
        }}
      />
      <button
        onClick={handleSubmit}
        type="submit"
        className="bg-pinkyDark text-white rounded-xl px-4 py-2 hover:bg-pink-600"
      >
        Add User
      </button>
    </form>
  );
}
