import { IBoard } from '../../interfaces/index.js';
import Board from '../models/Board.js';

class BoardRepository {

  async create(data: Omit<IBoard, '_id'>) {
    const board = new Board(data);
    return board.save();
  }

  async getById(id: string) {
    return Board.findById(id).populate('lists').populate('users')
  }

  async getAll(): Promise<IBoard[]> {
    return Board.find().populate('lists').populate('users')
  }

  async update(id: string, data: Partial<Omit<IBoard, '_id'>>) {
    return Board.findByIdAndUpdate(id, { $set: data }, { new: true }).populate('lists').populate('users')
  }

  async delete(id: string) {
    return Board.findByIdAndDelete(id).populate('lists').populate('users')
  }

  async getListsForBoard(boardId: string) {
    const board = await Board.findById(boardId).populate('lists')
    return board?.lists || [];
  }

  async getUsersForBoard(boardId: string) {
    const board = await Board.findById(boardId).populate('users')
    return board?.users || [];
  }
}

export default BoardRepository;
