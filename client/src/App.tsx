import WeatherWidget from './components/WeatherWidget';
import SearchBar from './components/SearchBar';
import RegisterForm from './components/RegisterForm';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

import './index.css';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="container mx-auto max-w-6xl grid grid-cols-12 gap-6">
        {/* Left: weather (col-span 3) */}
        <div className="col-span-12 md:col-span-3">
          <WeatherWidget />
        </div>

        {/* Center: register (col-span 6) */}
        <div className="col-span-12 md:col-span-6 flex items-center justify-center">
          <div className="w-full rounded-2xl p-6">
            <RegisterForm />
          </div>
        </div>

        {/* Right: item list (col-span 3) */}
        <div className="col-span-12 md:col-span-3">
          <ItemList items={[]} setItems={() => {}} />
        </div>
        {/* Below center: item form (col-span 6) */}
        <div className="col-span-12 md:col-span-6 flex items-center justify-center">
          <div className="w-ful rounded-2xl p-6  mt-6">
            <ItemForm setItems={() => {}} />
          </div>
        </div>

        {/* Right: search bar with icon (col-span 3) */}
        <div className="col-span-12 md:col-span-3 flex items-start justify-end">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
