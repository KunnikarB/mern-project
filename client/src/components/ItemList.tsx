import axios from 'axios';
import { type Item } from '../App';

interface Props {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const ItemList: React.FC<Props> = ({ items, setItems }) => {
  const deleteItem = async (id: string) => {
    try {
      await axios.delete(
        `https://mern-project-server-blue.vercel.app/items/${id}`
      );
      // Remove deleted item from state immediately
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };

  return (
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
