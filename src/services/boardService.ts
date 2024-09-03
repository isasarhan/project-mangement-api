import { GraphQLError } from 'graphql';
import { boardRepository } from '../database/repositories/index.js';
import { IBoard } from '../interfaces/index.js';
import { Service } from 'typedi';

@Service()
export class BoardService {
    private repository

    constructor() {
        this.repository = boardRepository;
    }

    async createBoard(data: IBoard) {
        try {
            return await this.repository.create(data);
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
    async getBoardById(id: string) {
        try {
            const board = await this.repository.getById(id);
            if (!board) {
                throw new GraphQLError('Board not found', {
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
    async getAllBoards() {
        try {
            return await this.repository.getAll();
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
    async updateBoard(id: string, data: IBoard) {
        try {
            const updatedBoard = await this.repository.update(id, data);
            if (!updatedBoard) {
                throw new GraphQLError('Board not found', {
                    extensions: {
                        code: 'NOT_FOUND',
                    },
                });
            }
            return updatedBoard;
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
    async deleteBoard(id: string) {
        try {
            const result = await this.repository.delete(id);
            if (!result) {
                throw new GraphQLError('Board not found', {
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
    async getListsForBoard(boardId: string) {
        try {
            return await this.repository.getListsForBoard(boardId);
        }
        catch (error) {
            console.error('Error retrieving lists for board:', error);
            throw new GraphQLError('Failed to retrieve lists for board', {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: error,
                },
            });
        }
    }
    async getUsersForBoard(boardId: string) {
        try {
            return await this.repository.getUsersForBoard(boardId);
        }
        catch (error) {
            console.error('Error retrieving users for board:', error);
            throw new GraphQLError('Failed to retrieve users for board', {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: error,
                },
            });
        }
    }
}
