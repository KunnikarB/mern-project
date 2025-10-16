import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

const seed = async () => {
  try {
    console.log('🚀 Connecting to PostgreSQL via Prisma...');

    // 1️⃣ Clear existing data
    await prisma.playSession.deleteMany();
    await prisma.game.deleteMany();
    await prisma.user.deleteMany();
    console.log('🧹 Cleared tables');

    // 2️⃣ Create users
    const usersData = [
      {
        firstName: 'Kunnikar',
        lastName: 'Boonbunlu',
        email: 'kunnikar@gmail.com',
      },
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
      usersData.map((u) =>
        prisma.user.create({
          data: {
            ...u,
            profileImage: `https://api.dicebear.com/9.x/lorelei/svg?seed=${encodeURIComponent(
              u.email
            )}`,
          },
        })
      )
    );
    console.log(`✅ Created ${users.length} users`);

    // 3️⃣ Create games
    const gamesData = [
      { name: 'Chess' },
      { name: 'Sudoku' },
      { name: 'Tetris' },
      { name: 'Tic-Tac-Toe' },
    ];

    const games = await Promise.all(
      gamesData.map((g) => prisma.game.create({ data: g }))
    );
    console.log(`✅ Created ${games.length} games`);

    // 4️⃣ Create play sessions
    const sessions = [];
    for (const user of users) {
      for (const game of games) {
        const minutes = Math.floor(Math.random() * 120);
        sessions.push({
          userId: user.id,
          gameId: game.id,
          minutesPlayed: minutes,
        });
      }
    }

    await prisma.playSession.createMany({ data: sessions });
    console.log(`✅ Created ${sessions.length} play sessions`);

    console.log('🌟 PostgreSQL seed completed!');
    await prisma.$disconnect();
  } catch (err) {
    console.error('❌ Seed failed:', err);
    await prisma.$disconnect();
    process.exit(1);
  }
};

seed();
