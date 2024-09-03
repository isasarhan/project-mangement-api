import { GraphQLError } from 'graphql';
import { BoardService } from '../../services/boardService.js'; // Adjust the path as needed
import { Args, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { GetBoardArgs } from '../typedefs/boardTypeDefs.js';

@Service()
@Resolver()
export class BoardResolvers {
  constructor(private readonly service: BoardService){}


  @Query()
  async getBoardById(@Args() { _id }: GetBoardArgs) {
    return await this.service.getBoardById(_id);
  }
}
// const boardResolvers = {
//   Query: {
    

//     async getAllBoards(): Promise<IBoard  []> {
//       return await service.getAllBoards();
//     },
//   },

//   Mutation: {
//     async createBoard(_: any, { title, lists, users }: IBoard) {
//       return await service.createBoard({ title, lists, users });
//     },

//     async updateBoard(_: any, { id, title, lists, users }: any): Promise<IBoard | null> {
//       return await service.updateBoard(id, { title, lists, users });
//     },

//     async deleteBoard(_: any, { id }: { id: string }): Promise<IBoard | null> {
//       return await service.deleteBoard(id);
//     },
//   },

// };

// export default boardResolvers;
