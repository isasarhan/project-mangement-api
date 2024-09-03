import { IUser } from "../../interfaces/index.js";
import User from "../models/User.js";


class UserRepository {

    async create(data: IUser) {
        const user = new User(data)
        return await user.save()
    }

    async update(id: string, data: Partial<IUser>) {
        return await User.findByIdAndUpdate(id, { $set: data }, { new: true })
    }

    async delete(id: string) {
        return await User.findByIdAndDelete(id)
    }

    async getById(id: string) {
        return await User.findById(id).select("-password")
    }

    async getAll() {
        return await User.find().select("-password")
    }

}

export default UserRepository