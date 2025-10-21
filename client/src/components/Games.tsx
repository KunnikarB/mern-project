import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

type Game = {
  _id: string;
  name: string;
};

export default function Games() {
  const { userId } = useParams<{ userId: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    const startNewGame = async () => {
      try {
        // Fetch all games
        const res = await api.get('/games');
        const games: Game[] = res.data;

        if (games.length === 0) return;

        // Pick a random game
        const randomGame = games[Math.floor(Math.random() * games.length)];
        setGame(randomGame);

        // Redirect to game session
        navigate(`/games/session/${randomGame._id}/${userId}`);
      } catch (err) {
        console.error(err);
      }
    };

    startNewGame();
  }, [userId, navigate]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-128px)]">
      {game ? (
        <p>Starting game "{game.name}"...</p>
      ) : (
        <p>Loading new game...</p>
      )}
    </div>
  );
}
