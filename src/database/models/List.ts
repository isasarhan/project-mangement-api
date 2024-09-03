import { Schema, model } from 'mongoose';
import { IList } from '../../interfaces/index.js';

const ListSchema = new Schema<IList>({
  title: { type: String, required: true },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
  createdAt: { type: Date, default: Date.now }
});

const ListModel = model<IList>('List', ListSchema);
export default ListModel;
