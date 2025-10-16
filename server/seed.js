import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Game from './src/models/Game.js';
import PlaySession from './src/models/PlaySession.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // 1️⃣ Clear existing data
    await User.deleteMany();
    await Game.deleteMany();
    await PlaySession.deleteMany();

    // 2️⃣ Create users
    const usersData = [
      { firstName: 'Kunnikar', lastName: 'Boonbunlu', email: 'kunnikar@gmail.com' },
      { firstName: 'Israt', lastName: 'Erin', email: 'israt@gmail.com' },
      { firstName: 'Shahid', lastName: 'Manzoor', email: 'shahid@gmail.com' },
      { firstName: 'Charlie', lastName: 'Brown', email: 'charlie@gmail.com' },
      { firstName: 'David', lastName: 'Williams', email: 'david@gmail.com' },
      { firstName: 'Eve', lastName: 'Davis', email: 'eve@gmail.com' },
      { firstName: 'Frank', lastName: 'Miller', email: 'frank@gmail.com' },
      { firstName: 'Grace', lastName: 'Wilson', email: 'grace@gmail.com' },
      { firstName: 'Hannah', lastName: 'Moore', email: 'hannah@gmail.com' },
    ];
    
    const users = await Promise.all(
      usersData.map(async (u) => {
        return await User.create({
          ...u,
          profileImage: `https://api.dicebear.com/9.x/lorelei/svg?seed=${encodeURIComponent(
            u.email
          )}`,
        });
      })
    );
    console.log(`✅ Created ${users.length} users`);

    // 3️⃣ Create real games
    const gamesData = [
      { name: 'Chess' },
      { name: 'Sudoku' },
      { name: 'Tetris' },
      { name: 'Tic-Tac-Toe' },
    ];

    const games = await Game.insertMany(gamesData);
    console.log(`✅ Created ${games.length} games`);

    // 4️⃣ Create random play sessions
    const sessions = [];
    users.forEach((user) => {
      games.forEach((game) => {
        const minutes = Math.floor(Math.random() * 120); // 0–120 mins
        sessions.push({
          user: user._id,
          game: game._id,
          minutesPlayed: minutes,
          date: new Date(),
        });
      });
    });

    await PlaySession.insertMany(sessions);
    console.log(`✅ Created ${sessions.length} play sessions`);

    console.log('🌟 Seed finished!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
};

seed();
