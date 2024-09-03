import { Schema, model } from 'mongoose';
import { IBoard } from '../../interfaces/index.js';


const BoardSchema = new Schema<IBoard>({
  title: { type: String, required: true },
  lists: [{ type: Schema.Types.ObjectId, ref: 'List' }],
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

const BoardModel = model<IBoard>('Board', BoardSchema);
  
export default BoardModel;
 