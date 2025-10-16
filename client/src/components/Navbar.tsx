import WeatherWidget from './WeatherWidget';
import SearchBar from './SearchBar';
import '../index.css';

export default function Navbar() {
  return (
    <nav className="w-full bg-white dark:bg-pink-400 shadow-lg py-4 px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* 1️⃣ Weather Widget — hidden above title on mobile */}
      <div className="order-2 md:order-1 w-full md:w-auto flex justify-center md:justify-start">
        <WeatherWidget />
      </div>

      {/* 2️⃣ App Title — first on mobile, centered on desktop */}
      <h1 className="order-1 md:order-2 text-2xl font-bold text-pinkyDark dark:text-white font-[Doto] text-center w-full md:w-auto">
        🎮 Game Tracker
      </h1>

      {/* 3️⃣ Search Bar — last on both mobile and desktop */}
      <div className="order-3 w-full md:w-auto flex justify-center md:justify-end">
        <SearchBar />
      </div>
    </nav>
  );
}
