import { Model, Document, Types } from 'mongoose';
import List from '../models/List.js';
import { IList } from '../../interfaces/index.js';

class ListRepository {

  async create(data: IList) {
    const board = new List(data);
    return board.save();
  } 

  async getById(id: string) {
    return List.findById(id).populate('lists').populate('users')
  }

  async getAll(): Promise<IList[]> {
    return List.find().populate('lists').populate('users')
  }

  async update(id: string, data: Partial<IList>) {
    return List.findByIdAndUpdate(id, { $set: data }, { new: true }).populate('lists').populate('users')
  }

  async delete(id: string) {
    return List.findByIdAndDelete(id).populate('lists').populate('users')
  }

  async removeCard(listId: string, cardId: string) {
    const list = await List.findById(listId)
    if (!list) {
      throw new Error("list not found!");
    }
    return await list.removeCard(cardId)
  }

  async addCard(listId: string, cardId: string) {
    const list = await List.findById(listId)
    if (!list) {
      throw new Error("list not found!");
    }
    return await list.addCard(cardId)
  }
}

export default ListRepository;