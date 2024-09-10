import { Schema, model, Document } from 'mongoose'
import { ICustomer, IUser } from '../../interfaces/index.js'
import CustomerModel, { ICustomerDocument } from './Customer.js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
interface IUserDocument extends IUser, Document {
  customers?: Schema.Types.ObjectId[]
  resetPasswordToken: string | undefined,
  resetPasswordExpires: Date | undefined,
  generateToken(): Promise<IUserDocument>
  matchPassword(password: string): Promise<boolean>
  resetPassword(password: string): Promise<boolean>
  addCustomer(customerData: ICustomer): Promise<ICustomerDocument>
}

const UserSchema = new Schema<IUserDocument>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  customers: [{ type: Schema.Types.ObjectId, ref: 'Customer' }],
  resetPasswordToken: String,
  resetPasswordExpires: Date,
})

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.methods.generateToken = async function () {
  const token = crypto.randomBytes(20).toString('hex')
  this.resetPasswordToken = token
  this.resetPasswordExpires = new Date(Date.now() + 3600000)
  return await this.save()
}

UserSchema.methods.matchPassword = async function (newPassword: string) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(newPassword, salt)
  this.resetPasswordToken = undefined
  this.resetPasswordExpires = undefined
  return await this.save()
}

UserSchema.methods.addCustomer = async function (customerData: ICustomer) {
  const user = this
  const customer = await CustomerModel.create({ ...customerData, user: user._id })
  user.customers.push(customer._id)
  await user.save()
  return customer
}

const UserModel = model<IUserDocument>('User', UserSchema)

export default UserModel