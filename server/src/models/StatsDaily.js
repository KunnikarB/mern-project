import mongoose from 'mongoose';

const statsDailySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    date: { type: Date, required: true },
    minutesPlayed: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('StatsDaily', statsDailySchema);
