import { useState, useEffect } from 'react';
import axios from 'axios';

type Item = {
  _id: string;
  name: string;
  quantity: number;
};

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const BACKEND_URL = 'https://mern-project-server-blue.vercel.app/items';

  // Fetch all items
  const fetchItems = async () => {
    try {
      const response = await axios.get(BACKEND_URL);
      setItems(response.data);
    } catch (err) {
      console.error('Failed to fetch items', err);
    }
  };

  // Add new item
  const createItem = async () => {
    try {
      await axios.post(BACKEND_URL, { name, quantity });
      setName('');
      setQuantity(1);
      fetchItems();
    } catch (err) {
      console.error('Failed to create item', err);
    }
  };

  // Update item quantity
  const updateItem = async (id: string, newQuantity: number) => {
    try {
      await axios.put(`${BACKEND_URL}/${id}`, { quantity: newQuantity });
      fetchItems();
    } catch (err) {
      console.error('Failed to update item', err);
    }
  };

  // Delete item
  const deleteItem = async (id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/${id}`);
      fetchItems();
    } catch (err) {
      console.error('Failed to delete item', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h1>Item Management</h1>

      {/* Item Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createItem();
        }}
      >
        <h2>Add Item</h2>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            required
            min={1}
          />
        </label>

        <button type="submit">Add</button>
      </form>

      {/* Item List */}
      <div>
        <h2>Items</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={(e) =>
                      updateItem(item._id, parseInt(e.target.value))
                    }
                  />
                </td>
                <td>
                  <button onClick={() => deleteItem(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
