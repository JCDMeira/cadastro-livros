import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  synopsis: { type: String, required: false },
  photo: { type: String, required: false, default: null },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  created_at: { type: Number, required: true },
  updated_at: { type: Number, required: true },
});

export default mongoose.model('book', BookSchema);
