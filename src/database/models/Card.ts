import { Schema, model } from 'mongoose';
import { ICard } from '../../interfaces/index.js';

const CardSchema = new Schema<ICard>({
    title: { type: String, required: true },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    description: { type: String },
    status: { type: String, enum: ['complete', 'finished', 'onHold', "discrarded"], default:"onHold" },
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
});

const CardModel = model<ICard>('Card', CardSchema);
export default CardModel;
