import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Users from './pages/Users';
import Profile from './pages/Profile';
import Games from './pages/Games';
import GameSession from './pages/GameSession';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      <div className="flex flex-1 ">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-6 min-h-[calc(100vh-128px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/games/:userId" element={<Games />} />{' '}
            {/* Games page */}
            <Route path="/games/:gameId" element={<Games />} />
            <Route
              path="/games/session/:gameId/:userId"
              element={<GameSession />}
            />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </main>
      </div>

      <footer className="w-full bg-white dark:bg-gray-800 shadow-lg py-4 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} MyApp. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
