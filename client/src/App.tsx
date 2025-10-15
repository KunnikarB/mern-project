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
    <div>
      <h1>Item Management</h1>
      <ItemForm setItems={setItems} />
      <ItemList items={items} setItems={setItems} />
    </div>
  );
}

export default App;
