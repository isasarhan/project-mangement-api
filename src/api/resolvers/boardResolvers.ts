import { GraphQLError } from 'graphql';
import { BoardService } from '../../services/boardService.js'; // Adjust the path as needed
import { Args, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { AddBoardArgs, Board, DeleteBoardArgs, EditBoardArgs, GetBoardArgs } from '../typedefs/boardTypeDefs.js';

@Service()
@Resolver()
export class BoardResolvers {
  constructor(private readonly service: BoardService) { }

  @Query(() => Board)
  async getBoardById(@Args() { _id }: GetBoardArgs) {
    return await this.service.getBoardById(_id);
  }

  @Query(() => Board)
  async getAllBoards() {
    return await this.service.getAllBoards();
  }

  @Mutation(() => Board)
  async createBoard(@Args() data: AddBoardArgs) {
    return await this.service.createBoard(data);
  }
  @Mutation(() => Board)
  async updateBoard(_: any, data: EditBoardArgs) {
    const { _id, ...rest } = data
    return await this.service.updateBoard(_id, rest);
  }
  @Mutation(() => Board)
  async deleteBoard(_: any, { _id }: DeleteBoardArgs) {
    return await this.service.deleteBoard(_id);
  }

}
