# 🎮 Game Tracker

A full-stack web application to tracks users' game play sessions, displays statistics, and visualizes data with charts. Users can play games, save their sessions, and view total minutes played per game and manage playtime dynamically. 
- Built with
  - **React**, **TypeScript**, **Express**, **Prisma**, and **PostgreSQL**.  

<img width="1610" height="941" alt="Screenshot 2025-10-21 at 15 19 40" src="https://github.com/user-attachments/assets/eaaafc85-64ee-4a8e-9ff8-2045f2ab566f" />

---

## 🧩 Features

- **User Management**
  - View user profiles with avatar, name, and total playtime.
  
- **Game Sessions**
  - Start and stop a game session with automatic timer.
  - Record playtime accurately (minutes and seconds).
  - Update user, game, and daily stats totals automatically.
  
- **Dashboard & Charts**
  - Line chart displaying user playtime per day
  - Horizontal Bar chart displaying minutes played per game.
  - Doughnut chart displaying top user per game
  - Real-time chart updates when sessions are added or deleted.
  - Total minutes played summary.

- **Session Management**
  - Delete individual play sessions.
  - Backend automatically adjusts totals when a session is deleted.

- **Responsive UI**
  - Works on desktop and mobile devices.

<img width="1611" height="965" alt="Screenshot 2025-10-21 at 15 20 00" src="https://github.com/user-attachments/assets/6bd889e5-4f21-495a-9eac-61507d0d7aae" />
---

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, react-router-dom, react-chartjs-2 
- **Backend:** Node.js, Express, TypeScript, Prisma ORM  
- **Database:** PostgreSQL  
- **API Validation:** Zod validation
- **Routing: React Router
- **HTTP requests: Axios

---

## 🚀 Installation

1. Clone the repo

  git clone : https://github.com/KunnikarB/mern-deploy

2. Install backend dependencies
<pre>
  cd server
  npm install
</pre>

3. Install frontend dependencies
 <pre>
  cd client
  npm install
</pre> 
4. Set up environment variables
  - Create a .env file in the backend folder:
    - DATABASE_URL=postgresql://user:password@localhost:5432/yourDatabaseName
    - PORT=3000
5. Run migrations
  - npx prisma migrate dev --name init
6. Start the backend
  - npm run dev
7. Start the frontend
  - npm run dev

---  

## 🏗 Future Improvements

Add game library management (create/edit games)

Add authentication for users

Add modal confirmation before deleting sessions

Add filter/sort sessions by date or game


--- 


