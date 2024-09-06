import { ICustomer } from "../../interfaces/index.js";
import Customer from "../models/Customer.js";


class CustomerRepository {

    async create(data: ICustomer) {
        const customer = new Customer(data)
        return (await customer.save()).populate('user')
    }

    async update(id: string, data: Partial<ICustomer>) {
        return await Customer.findByIdAndUpdate(id, { $set: data }, { new: true }).populate('user')
    }

    async delete(id: string) {
        return await Customer.findByIdAndDelete(id).populate('user')
    }

    async getById(id: string) {
        return await Customer.findById(id).populate('user')
    }

    async getAll() {
        return await Customer.find().populate('user')
    }
}

export default CustomerRepository