import { Schema, model, Document } from 'mongoose';
import { ICustomer, IUser } from '../../interfaces/index.js';
import bcrypt from 'bcryptjs';
import CustomerModel from './Customer.js';

interface IUserDocument extends IUser, Document {
  matchPassword(password: string): Promise<boolean>;
  addCustomer(customerData: ICustomer): Promise<ICustomer>;
  customers?: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUserDocument>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  customers: [{ type: Schema.Types.ObjectId, ref: 'Customer' }]
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.addCustomer = async function (customerData: ICustomer) {
  const user = this
  const customer = await CustomerModel.create({ ...customerData, user: user._id })
  user.customers.push(customer._id)
  await user.save()
  return customer
}

const UserModel = model<IUserDocument>('User', UserSchema);

export default UserModel;