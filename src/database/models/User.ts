import { Schema, model } from 'mongoose';
import { IUser } from '../../interfaces/index.js';
import bcrypt from 'bcryptjs'

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.matchPasswords = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

const UserModel = model('User', UserSchema);

export default UserModel;
