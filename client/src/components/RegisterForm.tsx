import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1) Register user
      const reg = await api.post('/users', { email, firstName, lastName });
      const user = reg.data;

      // 2) If photo chosen, upload via multipart form
      if (photo) {
        const form = new FormData();
        form.append('photo', photo);
        await api.post(`/users/${user._id}/photo`, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      // navigate to user profile page (Page-2 or Page-3)
      navigate(`/profile/${user._id}`);
    } catch (err) {
      console.error(err);
      alert('Could not register');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-pinkyDark">Register</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
        required
      />
      <input
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="input"
        required
      />
      <input
        placeholder="Last name"
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
      <button className="bg-pinkyDark text-white rounded-xl px-4 py-2">
        Register
      </button>
    </form>
  );
}
