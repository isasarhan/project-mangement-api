import { Schema, model } from 'mongoose'
import { IBoard } from '../../interfaces/index.js'
import ListModel from './List.js'
import UserModel from './User.js'

interface IBoardDocument extends IBoard, Document {
  addList(listId: string): Promise<IBoardDocument>
  removeList(listId: string): Promise<IBoardDocument>
  addUser(userId: string): Promise<IBoardDocument>
  removeUser(userId: string): Promise<IBoardDocument>
}

const BoardSchema = new Schema<IBoardDocument>({
  title: { type: String, required: true },
  lists: [{ type: Schema.Types.ObjectId, ref: 'List' }],
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
})

BoardSchema.methods.addList = async function (listId: string) {
  if (!this.list.includes(listId)) {
    this.list.push(listId)
    return await this.save()
  }
  return this
}

BoardSchema.methods.removeList = async function (listId: string) {
  const list = await ListModel.findById(listId)
  if (!list)
    throw new Error('list not found!')

  this.lists = this.lists.filter((list: string) => list.toString() !== listId.toString())
  return await this.save()
}

BoardSchema.methods.addUser = async function (userId: string) {
  if (!this.users.includes(userId)) {
    this.users.push(userId)
    return await this.save()
  }
  return this
}

BoardSchema.methods.removeUser = async function (userId: string) {
  const user = await UserModel.findById(userId)
  if (!user)
    throw new Error('user not found!')

  this.users = this.users.filter((user: string) => user.toString() !== userId.toString())
  return await this.save()
}

const BoardModel = model<IBoardDocument>('Board', BoardSchema)
export default BoardModel
