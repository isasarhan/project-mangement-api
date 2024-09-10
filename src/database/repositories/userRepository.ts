import { ICustomer, IUser } from "../../interfaces/index.js"
import User from "../models/User.js"
class UserRepository {

    async create(data: IUser) {
        const user = new User(data)
        return await user.save()
    }

    async addCustomer(id: string, customer: ICustomer) {
        const user = await User.findById(id)
        if (!user) {
            throw new Error('User not found')
        }
        return await user.addCustomer(customer)
    }
    async requestPasswordReset(email: string) {
        const user = await User.findOne({ email })
        if (!user) throw new Error('User not found')

        return await user.generateToken()
    }

    async resetPassword(newPassword: string, token: string) {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        })

        if (!user) throw new Error('Password reset token is invalid or has expired.')

        return await user.resetPassword(newPassword)
    }

    async update(id: string, data: Partial<IUser>) {
        return await User.findByIdAndUpdate(id, { $set: data }, { new: true })
    }

    async delete(id: string) {
        return await User.findByIdAndDelete(id)
    }

    async getById(id: string) {
        return await User.findById(id)
    }

    async getByEmail(email: string) {
        return await User.findOne({ email })
    }

    async getAll() {
        return await User.find().select("-password")
    }

}

export default UserRepository