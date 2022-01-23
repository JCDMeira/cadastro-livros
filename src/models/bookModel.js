import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  synopsis: { type: String, required: false },
  created_at: { type: Number, required: true },
  updated_at: { type: Number, required: true },
});

export default mongoose.model('book', UserSchema);
