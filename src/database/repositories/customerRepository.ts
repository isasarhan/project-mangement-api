import { ICustomer } from "../../interfaces/index.js";
import Customer from "../models/Customer.js";


class CustomerRepository {

    async create(data: ICustomer) {
        const customer = new Customer(data)
        return await customer.save()
    }

    async update(id: string, data: Partial<ICustomer>) {
        return await Customer.findByIdAndUpdate(id, { $set: data }, { new: true })
    }

    async delete(id: string) {
        return await Customer.findByIdAndDelete(id)
    }

    async getById(id: string) {
        return await Customer.findById(id)
    }

    async getAll() {
        return await Customer.find()
    }
}

export default CustomerRepository