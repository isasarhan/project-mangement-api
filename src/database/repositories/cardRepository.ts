import { ICard } from "../../interfaces/index.js";
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
        return await Card.findById(id).populate("customer").populate("members")
    }
    async getAll() {
        return await Card.find().populate("customer").populate("members")
    }
}

export default CardRepository