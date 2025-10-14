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
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const BACKEND_URL = 'https://mern-project-server-blue.vercel.app/items';

  // Fetch all items
  const fetchItems = async () => {
    try {
      const response = await axios.get(BACKEND_URL);
      setItems(response.data);
    } catch (err) {
      console.error('❌ Failed to fetch items:', err);
    }
  };

  // Create new item
  const createItem = async () => {
    try {
      await axios.post(BACKEND_URL, { name, quantity });
      setName('');
      setQuantity(1);
      fetchItems();
    } catch (err) {
      console.error('❌ Failed to create item:', err);
    }
  };

  // Delete item
  const deleteItem = async (id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/${id}`);
      fetchItems();
    } catch (err) {
      console.error('❌ Failed to delete item:', err);
    }
  };

  // Update item
  const updateItem = async () => {
    if (!editingItem) return;
    try {
      await axios.put(`${BACKEND_URL}/${editingItem._id}`, {
        name: editingItem.name,
        quantity: editingItem.quantity,
      });
      setEditingItem(null);
      fetchItems();
    } catch (err) {
      console.error('❌ Failed to update item:', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>🛒 Item Management</h1>

      {/* Add Item Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createItem();
        }}
        style={{ marginBottom: '30px' }}
      >
        <h2>Add Item</h2>
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          min={1}
          required
        />
        <button type="submit">Add</button>
      </form>

      {/* Items Table */}
      <h2>Items</h2>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <table border={1} cellPadding={8}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) =>
              editingItem && editingItem._id === item._id ? (
                <tr key={item._id}>
                  <td>
                    <input
                      type="text"
                      value={editingItem.name}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editingItem.quantity}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          quantity: parseInt(e.target.value),
                        })
                      }
                    />
                  </td>
                  <td>
                    <button onClick={updateItem}>Save</button>
                    <button onClick={() => setEditingItem(null)}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button onClick={() => setEditingItem(item)}>Edit</button>
                    <button onClick={() => deleteItem(item._id)}>Delete</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
