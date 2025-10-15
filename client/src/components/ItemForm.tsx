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
      onSubmit={(e) => {
        e.preventDefault();
        createItem();
      }}
    >
      <h2>Add Item</h2>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        name="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="quantity">Quantity:</label>
      <input
        id="quantity"
        name="quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        required
      />

      <button type="submit">Add</button>
    </form>
  );
};

export default ItemForm;
