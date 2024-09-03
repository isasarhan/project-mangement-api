import { GraphQLError } from "graphql"
import { userRepository } from "../database/repositories/index.js"
import { IUser } from "../interfaces/index.js"
import { Service } from "typedi"

@Service()
export class UserService {
    private repository

    constructor() {
        this.repository = userRepository
    }

    async createUser(data: IUser) {
        try {
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
    async updateUser(id: string, data: Partial<IUser>) {
        try {
            const updated = await this.repository.update(id, data)
            if (!updated) throw new GraphQLError("User Not Found", {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                }
            })
            return updated
        } catch (error) {
            if (error instanceof GraphQLError) throw error
            throw new GraphQLError("Error Updating User", {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: error,
                }
            })
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
