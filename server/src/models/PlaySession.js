import mongoose from 'mongoose';

const playSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  minutes: { type: Number, required: true },
  date: { type: Date, default: Date.now }, // when played
}, { timestamps: true });

export default mongoose.model('PlaySession', playSessionSchema);
