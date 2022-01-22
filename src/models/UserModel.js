import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Number, required: true },
  updated_at: { type: Number, required: true },
});

UserSchema.pre('save', async function encryptPassword() {
  const passwordHash = await bcrypt.hash(this.password, 10);
  this.password = passwordHash;
});

export default mongoose.model('user', UserSchema);
