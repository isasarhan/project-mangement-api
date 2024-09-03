import { GraphQLError } from 'graphql';
import { listRepository } from '../database/repositories/index.js';
import { IList } from '../interfaces/index.js';
import { Service } from 'typedi';

@Service()
export class ListService {
    private listRepository: any;

    constructor() {
        this.listRepository = listRepository;
    }

    async createList(data: IList) {
        try {
            return await this.listRepository.create(data);
        }
        catch (error) {
            console.error('Error creating board:', error);
            throw new GraphQLError('Failed to create board', {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: error,
                },
            });
        }
    }
    async getListById(id: string) {
        try {
            const board = await this.listRepository.getById(id);
            if (!board) {
                throw new GraphQLError('List not found', {
                    extensions: {
                        code: 'NOT_FOUND',
                    },
                });
            }
            return board;
        }
        catch (error) {
            console.error('Error retrieving board:', error);
            throw new GraphQLError('Failed to retrieve board', {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: error,
                },
            });
        }
    }
    async getAllLists() {
        try {
            return await this.listRepository.getAll();
        }
        catch (error) {
            console.error('Error retrieving boards:', error);
            throw new GraphQLError('Failed to retrieve boards', {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: error,
                },
            });
        }
    }
    async updateList(id: string, data: IList) {
        try {
            const updatedList = await this.listRepository.update(id, data);
            if (!updatedList) {
                throw new GraphQLError('List not found', {
                    extensions: {
                        code: 'NOT_FOUND',
                    },
                });
            }
            return updatedList;
        }
        catch (error) {
            console.error('Error updating board:', error);
            throw new GraphQLError('Failed to update board', {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: error,
                },
            });
        }
    }
    async deleteList(id: string) {
        try {
            const result = await this.listRepository.delete(id);
            if (!result) {
                throw new GraphQLError('List not found', {
                    extensions: {
                        code: 'NOT_FOUND',
                    },
                });
            }
            return result;
        }
        catch (error) {
            console.error('Error deleting board:', error);
            throw new GraphQLError('Failed to delete board', {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: error,
                },
            });
        }
    }
   
}
