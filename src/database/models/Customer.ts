import { Schema, model } from 'mongoose';
import { ICustomer } from '../../interfaces/index.js';


const CustomerSchema = new Schema<ICustomer>({
    name: { type: String, required: true, unique: true },
    location: { type: String },
    number: { type: String },
    description: { type: String }
});

const CustomerModel = model('Customer', CustomerSchema);
export default CustomerModel
