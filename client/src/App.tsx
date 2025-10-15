import { useState, useEffect } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import axios from 'axios';

export type Item = {
  _id: string;
  name: string;
  quantity: number;
};

function App() {
  const [items, setItems] = useState<Item[]>([]);

  // Fetch items on mount
  const fetchItems = async () => {
    try {
      const response = await axios.get(
        'https://mern-project-server-blue.vercel.app/items'
      );
      setItems(response.data);
    } catch (err) {
      console.error('Failed to fetch items:', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-pinky p-6">
      {/* Card container */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-pink-lg p-6 flex flex-col items-center space-y-6">
        {/* Title */}
        <h1 className="text-4xl font-bold text-pinkyDark text-center mb-4">
          🌸 Item Management
        </h1>

        {/* Form */}
        <ItemForm setItems={setItems} />

        {/* Item List */}
        <ItemList items={items} setItems={setItems} />
      </div>
    </div>
  );
}

export default App;
