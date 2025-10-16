import WeatherWidget from './WeatherWidget';
import SearchBar from './SearchBar';

export default function Navbar() {
  return (
    <>
      <nav className="w-full bg-white dark:bg-pink-400 shadow-lg py-4 px-6 flex items-center gap-4">
        {/* Left: Weather Widget */}
        <div className="flex-shrink-0">
          <WeatherWidget />
        </div>

        {/* App Title */}
        <h1 className="flex-1 text-2xl font-bold text-white mb-6 text-center">
          🎮 Game Tracker
        </h1>

        {/* Right: Search Bar */}
        <div className="flex-1 justify-end flex min-w-0">
          <SearchBar />
        </div>
      </nav>
    </>
  );
}
