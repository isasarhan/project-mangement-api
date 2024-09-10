import { GraphQLError } from "graphql"
import { userRepository } from "../database/repositories/index.js"
import { IUser } from "../interfaces/index.js"
import { Service } from "typedi"
import { generateJwtToken } from "../utilities/jwtUtilities.js"
import { AppError, ErrorCodes, isAppError } from "../utilities/appError.js"
import { SERVER_ERROR, USER_NOT_FOUND, USER_UPDATE_ERROR } from "../utilities/messages.js"
import { sendResetEmail } from "../utilities/emailHandler.js"
@Service()
export class UserService {
    private repository

    constructor() {
        this.repository = userRepository
    }

    async createUser(data: IUser): Promise<IUser> {
        try {
            const { email } = data
            const user = await this.repository.getByEmail(email)
            if (user)
                throw new GraphQLError("User already Exists")
            return await this.repository.create(data)
        } catch (error) {
            throw new GraphQLError("Error Creating User", {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: error,
                }
            })
        }
    }
    async signIn(data: IUser) {
        try {
            const { email, password } = data
            const user = await this.repository.getByEmail(email)
            if (!user || !(await user.matchPassword(password)))
                throw new AppError({ message: USER_NOT_FOUND, code: ErrorCodes.NOT_FOUND, })

            return { user: user, token: generateJwtToken(user?._id, user?.email) }

        } catch (error: any) {
            isAppError(error)
            throw new AppError({
                message: SERVER_ERROR,
                code: ErrorCodes.INTERNAL_SERVER_ERROR,
                originalError: error,
            })
        }
    }

    async requestPasswordReset(email: string) {
        const user = await this.repository.requestPasswordReset(email)
        return await sendResetEmail({ email: user.email, username: user.username, resetToken: user.resetPasswordToken })
    }

    async resetPassword(newPassword: string, token: string) {
        return await this.repository.resetPassword(newPassword, token)
    }

    async updateUser(id: string, data: Partial<IUser>) {
        try {
            const updated = await this.repository.update(id, data)

            if (!updated)
                throw new AppError({ message: USER_NOT_FOUND, code: ErrorCodes.NOT_FOUND })

            return updated
        } catch (error) {
            isAppError(error)
            throw new AppError({ message: USER_UPDATE_ERROR, code: ErrorCodes.INTERNAL_SERVER_ERROR })
        }
    }

    async deleteUser(id: string) {
        try {
            const deleted = await this.repository.delete(id)
            if (!deleted) throw new GraphQLError("User Not Found", {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                }
            })
            return deleted
        } catch (error) {
            throw new GraphQLError("Error Deleting User", {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: error,
                }
            })
        }
    }

    async getUserById(id: string) {
        try {
            const user = await this.repository.getById(id)
            if (!user) throw new GraphQLError("User Not Found", {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                }
            })
            return user
        } catch (error) {
            throw new GraphQLError("Error Retreiving User", {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: error,
                }
            })
        }
    }

    async getAllUsers() {
        try {
            const users = await this.repository.getAll()
            return users
        } catch (error) {
            throw new GraphQLError("Error Retreiving All Users", {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: error,
                }
            })
        }
    }
}

