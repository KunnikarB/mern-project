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
    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-pink-400 mb-2 text-center">
        Items
      </h2>
      <table className="w-2/3 table-auto border-collapse text-center">
        <thead className="bg-pink-300 text-black rounded-xl">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="border-b">
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.quantity}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => deleteItem(item._id)}
                  className="bg-pink-300 text-black px-3 py-1 rounded-xl hover:bg-pink-200 transition cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
