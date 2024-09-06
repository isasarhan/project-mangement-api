import { GraphQLError } from "graphql";
import { customerRepository } from "../database/repositories/index.js";
import { Service } from "typedi";
import { ICustomer } from "../interfaces/index.js";


@Service()
export class CustomerService {
    private repository
 
    constructor() {
        this.repository = customerRepository;
    }

    async createCustomer(data: ICustomer) {
        try {
            return await this.repository.create(data)
        } catch (error) { 
            console.error(error);
            
            throw new GraphQLError("Error Creating Customer", {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: error,
                }
            })
        }
    }

    async updateCustomer(id: string, data: ICustomer) {
        try {
            const updated = await this.repository.update(id, data)
            if (!updated) {
                throw new GraphQLError("Customer Not Found", {
                    extensions: {
                        code: 'NOTE_FOUND',
                    }
                })
            }
            return updated
        } catch (error) {
            if (error instanceof GraphQLError) throw error
            throw new GraphQLError("Error Updating Customer", {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: error,
                }
            })
        }
    }

    async deleteCustomer(id: string) {
        try {
            const deleted = await this.repository.delete(id)
            if (!deleted) {
                throw new GraphQLError("Customer Not Found", {
                    extensions: {
                        code: 'NOT_FOUND',
                    }
                })
            }
            return deleted
        } catch (error) {
            if (error instanceof GraphQLError) throw error
            throw new GraphQLError("Error Deleting Customer", {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: error,
                }
            })
        }
    }

    async getAllCustomers() {
        try {
            return await this.repository.getAll()
        } catch (error) {
            throw new GraphQLError("Error Retreiving All Customers", {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: error,
                }
            })
        }
    }

    async getCustomerById(id: string) {
        try {
            return await this.repository.getById(id)
        } catch (error) {
            throw new GraphQLError("Error Customer by Id", {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: error,
                }
            })
        }
    }
}

