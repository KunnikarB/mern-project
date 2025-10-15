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
      { firstName: 'Alice', lastName: 'Smith', email: 'alice@test.com' },
      { firstName: 'Bob', lastName: 'Johnson', email: 'bob@test.com' },
      { firstName: 'Charlie', lastName: 'Brown', email: 'charlie@test.com' },
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

    // 3️⃣ Create games
    const gamesData = [
      { name: 'Game 1' },
      { name: 'Game 2' },
      { name: 'Game 3' },
      { name: 'Game 4' },
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
          minutes,
          date: new Date(), // today
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
