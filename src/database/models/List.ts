import { Document, Model, ObjectId, Schema, model } from 'mongoose'
import { IList } from '../../interfaces/index.js'

interface IListDocument extends IList, Document {
  removeCard(cardId: string): Promise<IListDocument>
  addCard(cardId: string): Promise<IListDocument>
}

interface IListModel extends Model<IListDocument> {
  getListByCardId(cardId: ObjectId): Promise<IListDocument | null>
}

const ListSchema = new Schema<IListDocument>({
  title: { type: String, required: true },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
  createdAt: { type: Date, default: Date.now }
})

ListSchema.methods.addCard = async function (cardId: string) {
  if (!this.cards.includes(cardId)) {
    this.cards.push(cardId)
    await this.save()
  }
  return this
}

ListSchema.methods.removeCard = async function (cardId: string) {
  if (!this.cards.includes(cardId))
    throw new Error("Card doesn't belong to this list")

  this.cards = this.cards.filter((card: string) => card.toString() !== cardId.toString())
  return await this.save()
}

ListSchema.statics.getListByCardId = async function (cardId: string) {
  const list = await this.findOne({ cards: { $in: [cardId] } })
  if (!list) {
    throw new Error("Card doesn't belong to any list")
  }
  return list
}

const ListModel = model<IListDocument, IListModel>('List', ListSchema)
export default ListModel
