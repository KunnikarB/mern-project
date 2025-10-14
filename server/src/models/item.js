import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  quantity: { type: Number, required: true, min: 1 },
});

const Item = mongoose.model('Item', itemSchema);
export default Item;
