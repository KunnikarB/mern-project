import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true }
);

export default mongoose.model('Game', gameSchema);
