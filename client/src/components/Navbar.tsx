import WeatherWidget from './WeatherWidget';
import SearchBar from './SearchBar';

export default function Navbar() {
  return (
    <>
      <nav className="w-full bg-white dark:bg-gray-800 shadow-lg py-4 px-6 flex items-center gap-4">
        {/* Left: Weather Widget */}
        <div className="flex-shrink-0">
          <WeatherWidget />
        </div>

        {/* Right: Search Bar */}
        <div className="flex-1 justify-end flex min-w-0">
          <SearchBar />
        </div>
      </nav>
    </>
  );
}
