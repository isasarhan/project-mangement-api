import { ICard, IComment } from "../../interfaces/index.js";
import Card from "../models/Card.js";

class CardRepository {

    async create(data: Partial<ICard>) {
        const card = new Card(data)
        return await card.save()
    }

    async update(id: string, data: Partial<ICard>) {
        return await Card.findByIdAndUpdate(id, { $set: data }, { new: true })
    }

    async delete(id: string) {
        return await Card.findByIdAndDelete(id)
    }

    async getById(id: string) {
        return await Card.findById(id).populate("customer").populate("members").populate("comments")
    }

    async getAll() {
        return await Card.find().populate("customer").populate("members").populate("comments")
    }

    async moveCard(listId: string, cardId: string) {
        const card = await Card.findById(cardId)
        return await card?.moveCard(listId)
    }

    async addComment(cardId: string, comment: IComment) {
        const card = await Card.findById(cardId)
        return await card?.addComment(comment)
    }

    async removeComment(cardId: string, commentId: string) {
        const card = await Card.findById(cardId)
        return await card?.removeComment(commentId)
    }

    async addMember(cardId: string, memberId: string) {
        const card = await Card.findById(cardId)
        return await card?.addMember(memberId)
    }

    async removeMember(cardId: string, memberId: string) {
        const card = await Card.findById(cardId)
        return await card?.removeMember(memberId)
    }
    
    async updateCustomer(cardId: string, customerId: string) {
        const card = await Card.findById(cardId)
        return await card?.updateCustomer(customerId)
    }
}

export default CardRepository