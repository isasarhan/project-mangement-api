import { GraphQLError } from 'graphql';
import { cardRepository } from '../database/repositories/index.js';
import { ICard } from '../interfaces/index.js';
import { Service } from 'typedi';

@Service()
export class CardService {
    private repository

    constructor() {
        this.repository = cardRepository;
    }

    async createCard(data: ICard) {
        try {
            return await this.repository.create(data);
        }
        catch (error) {
            console.error('Error creating card:', error);
            throw new GraphQLError('Failed to create card', {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: error,
                },
            });
        }
    }
    async getCardById(id: string) {
        try {
            const card = await this.repository.getById(id);
            if (!card) {
                throw new GraphQLError('Card not found', {
                    extensions: {
                        code: 'NOT_FOUND',
                    },
                });
            }
            return card;
        }
        catch (error) {
            console.error('Error retrieving card:', error);
            throw new GraphQLError('Failed to retrieve card', {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: error,
                },
            });
        }
    }
    async getAllCards() {
        try {
            return await this.repository.getAll();
        }
        catch (error) {
            console.error('Error retrieving cards:', error);
            throw new GraphQLError('Failed to retrieve cards', {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: error,
                },
            });
        }
    }
    async updateCard(id: string, data: ICard) {
        try {
            const updatedCard = await this.repository.update(id, data);
            if (!updatedCard) {
                throw new GraphQLError('Card not found', {
                    extensions: {
                        code: 'NOT_FOUND',
                    },
                });
            }
            return updatedCard;
        }
        catch (error) {
            console.error('Error updating card:', error);
            throw new GraphQLError('Failed to update card', {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: error,
                },
            });
        }
    }
    async deleteCard(id: string) {
        try {
            const result = await this.repository.delete(id);
            if (!result) {
                throw new GraphQLError('Card not found', {
                    extensions: {
                        code: 'NOT_FOUND',
                    },
                });
            }
            return result;
        }
        catch (error) {
            console.error('Error deleting card:', error);
            throw new GraphQLError('Failed to delete card', {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: error,
                },
            });
        }
    }
    
   
}
