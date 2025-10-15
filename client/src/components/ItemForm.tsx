import { useState } from 'react';
import axios from 'axios';
import { type Item } from '../App';

interface Props {
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const ItemForm: React.FC<Props> = ({ setItems }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const createItem = async () => {
    try {
      const response = await axios.post(
        'https://mern-project-server-blue.vercel.app/items',
        {
          name,
          quantity,
        }
      );
      // Update state immediately
      setItems((prev) => [...prev, response.data]);
      setName('');
      setQuantity(1);
    } catch (err) {
      console.error('Failed to create item:', err);
    }
  };

  return (
    <form
      className="flex flex-col items-center space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        createItem();
      }}
    >
      <h2 className="text-2xl font-semibold text-pink-400">Add Item</h2>
      <label className="flex items-center" htmlFor="name">
        Name:
      </label>
      <input
        id="name"
        name="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border border-pink-400 rounded-xl px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-300"
      />

      <label className="flex flex-col items-center w-full" htmlFor="quantity">
        Quantity:
      </label>
      <input
        id="quantity"
        name="quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        required
        className="border border-pink-400 rounded-xl px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-300"
      />

      <button
        className="text-black bg-pink-300
        font-semibold rounded-xl px-6 py-2 cursor-pointer hover:bg-pink-200 transition"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default ItemForm;
