
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

const seed = async () => {
  try {
    console.log('🚀 Connecting to PostgreSQL via Prisma...');

    //Clear existing data
    await prisma.playSession.deleteMany();
    await prisma.game.deleteMany();
    await prisma.user.deleteMany();
    console.log('🧹 Cleared tables');

    //Create users
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
    // Use a avatar for user profile image
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

    //Create games
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

    //Create Play Sessions 
    const sessions = [
      // 🎮 Kunnikar
      {
        userEmail: 'kunnikar@gmail.com',
        gameName: 'Chess',
        minutesPlayed: 120,
        createdAt: new Date('2025-10-10T10:00:00Z'),
      },
      {
        userEmail: 'kunnikar@gmail.com',
        gameName: 'Sudoku',
        minutesPlayed: 140,
        createdAt: new Date('2025-10-11T10:00:00Z'),
      },
      {
        userEmail: 'kunnikar@gmail.com',
        gameName: 'Tetris',
        minutesPlayed: 60,
        createdAt: new Date('2025-10-12T10:00:00Z'),
      },

      // 🎮 Israt
      {
        userEmail: 'israt@gmail.com',
        gameName: 'Chess',
        minutesPlayed: 90,
        createdAt: new Date('2025-10-10T10:00:00Z'),
      },
      {
        userEmail: 'israt@gmail.com',
        gameName: 'Tic-Tac-Toe',
        minutesPlayed: 45,
        createdAt: new Date('2025-10-13T10:00:00Z'),
      },

      // 🎮 Shahid
      {
        userEmail: 'shahid@gmail.com',
        gameName: 'Sudoku',
        minutesPlayed: 100,
        createdAt: new Date('2025-10-11T10:00:00Z'),
      },
      {
        userEmail: 'shahid@gmail.com',
        gameName: 'Tetris',
        minutesPlayed: 80,
        createdAt: new Date('2025-10-12T10:00:00Z'),
      },
      {
        userEmail: 'shahid@gmail.com',
        gameName: 'Tic-Tac-Toe',
        minutesPlayed: 50,
        createdAt: new Date('2025-10-13T10:00:00Z'),
      },
    ];

    for (const s of sessions) {
      const user = await prisma.user.findUnique({
        where: { email: s.userEmail },
      });
      const game = await prisma.game.findFirst({
        where: { name: s.gameName },
      });

      if (user && game) {
        await prisma.playSession.create({
          data: {
            userId: user.id,
            gameId: game.id,
            minutesPlayed: s.minutesPlayed,
            createdAt: s.createdAt,
            updatedAt: s.createdAt,
          },
        });
      }
    }
  } catch (error) {
    console.error('❌ Seed failed:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
