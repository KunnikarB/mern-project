import { useState } from 'react';
import axios from 'axios';

const ItemForm = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const createItem = async () => {
    try {
      await axios.post('https://mern-project-server-blue.vercel.app/items', {
        name,
        quantity,
      });
      alert('Item created!');
    } catch (err) {
      console.error('Failed to create item', err);
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
      <label htmlFor="name">
        Name:
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label htmlFor="quantity">
        Quantity:
        <input
          id="quantity"
          name="quantity"
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          required
        />
      </label>

      <button type="submit">Add</button>
    </form>
  );
};

export default ItemForm;
