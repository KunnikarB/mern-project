import { useState, useEffect } from "react";
import axios from 'axios';

type Item = {
  _id: string;
  name: string;
  quantity: number;
};

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        'https://mern-deploy-kappa.vercel.app/api/items'
      );
      setItems(response.data);
    } catch (err) {
      console.error('Failed to fetch items:', err)
    }
  }

  const deleteItem = async (id: string) => {
    try {
      await axios.delete(
        `https://mern-deploy-kappa.vercel.app/api/items/${id}`
      );
      // Remove item from state
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Failed to delete item:', err)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return(
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
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => deleteItem(item._id)}>Delete</button>
              </td>
            </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
};

export default ItemList

