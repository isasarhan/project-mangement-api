import { ObjectId, Schema, model } from 'mongoose';
import { ICustomer } from '../../interfaces/index.js';

export interface ICustomerDocument extends ICustomer, Document {
    user:ObjectId
}
  
const CustomerSchema = new Schema<ICustomerDocument>({
    name: { type: String, required: true, unique: true },
    residence: { type: String },
    number: { type: String },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const CustomerModel = model<ICustomerDocument>('Customer', CustomerSchema);
export default CustomerModel
