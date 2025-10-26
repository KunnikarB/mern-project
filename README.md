# 🎮 Game Tracker

## A full-stack web application to tracks users' game play sessions, displays statistics, and visualizes data with charts. Users can play games, save their sessions, and view total minutes played per game and manage playtime dynamically. 
## ⚒️ Built with
  ### **React**, **TypeScript**, **Express**, **Prisma**, and **PostgreSQL**.  
   
### 🏠 Home page 
<img width="1920" height="983" alt="Home" src="https://github.com/user-attachments/assets/feedd787-5e0c-4e1e-a049-05a2b6cd5978" />


### 👩🏻‍🎤 User Page 

<img width="1919" height="962" alt="Users" src="https://github.com/user-attachments/assets/5061edc5-f322-404f-abce-58216ed89f2b" />

###  📊 Play Sessions Statistic

<img width="1920" height="991" alt="PlaySession" src="https://github.com/user-attachments/assets/e4c6f474-3e64-420c-b418-d40e5ebb9df1" />

###  📊 Games Statistic
<img width="1911" height="984" alt="Games Statistics" src="https://github.com/user-attachments/assets/6b2ab58d-3b89-4d77-b6f9-3a62f64a8fb6" />


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


