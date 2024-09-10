import { Document, ObjectId, Schema, model } from 'mongoose'
import { ICard, IComment } from '../../interfaces/index.js'
import ListModel from './List.js'

interface ICommentDocument extends IComment, Document {
    _id: string
}

interface ICardDocument extends ICard, Document {
    moveCard(listId: string): Promise<ICard | null>
    addComment(comment: IComment): Promise<ICard | null>
    removeComment(commentId: string): Promise<ICard | null>
    addMember(memberId: string): Promise<ICard | null>
    removeMember(memberId: string): Promise<ICard | null>
    updateCustomer(customerId: string): Promise<ICard | null>
}

const CardSchema = new Schema<ICardDocument>({
    title: { type: String, required: true },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    description: { type: String },
    status: { type: String, enum: ['complete', 'delivered', 'onHold', 'discarded'], default: 'onHold' },
    labels: [{ type: String }],
    quantity: { type: Number },
    type: { type: String },
    dueDate: { type: Date },
    comments: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        text: { type: String },
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
})

CardSchema.methods.addComment = async function (comment: IComment) {
    this.comments.push(comment)
    return await this.save()
}

CardSchema.methods.removeComment = async function (commentId: string) {
    this.comments = this.comments.filter((comment: ICommentDocument) => comment._id.toString() !== commentId)
    return await this.save()
}

CardSchema.methods.addMember = async function (memberId: string) {
    if (!this.members.includes(memberId)) {
        this.members.push(memberId)
        return await this.save()
    }
    return this
}

CardSchema.methods.removeMember = async function (memberId: string) {
    this.members = this.members.filter((member: ObjectId) => member.toString() !== memberId)
    return await this.save()
}

CardSchema.methods.updateCustomer = async function (customerId: string) {
    this.customer = customerId
    return await this.save()
}

CardSchema.methods.moveCard = async function (listId: string) {
    const oldList = await ListModel.getListByCardId(this._id)
    if (oldList) {
        await oldList.removeCard(this._id)
    }

    const newList = await ListModel.findById(listId)
    if (!newList) throw new Error('List not found!')

    await newList.addCard(this._id)
}

const CardModel = model<ICardDocument>('Card', CardSchema)
export default CardModel
