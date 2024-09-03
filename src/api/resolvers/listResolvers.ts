import { Args, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { ListService } from '../../services/listService.js';
import { AddListArgs, DeleteListArgs, EditListArgs, GetListArgs, List } from '../typedefs/listTypeDefs.js';

@Service()
@Resolver(() => List)
export class ListResolver {
  constructor(private readonly service: ListService) { }
  @Query(() => List)
  async getListById(@Args() { _id }: GetListArgs) {
    return await this.service.getListById(_id);
  }

  @Query(() => [List])
  async getAllLists() {
    return await this.service.getAllLists();
  }

  @Mutation(() => List)
  async createList(@Args() data: AddListArgs) {
    return await this.service.createList(data);
  }

  @Mutation(() => List)
  async updateList(@Args() data: EditListArgs) {
    const { _id, ...rest } = data
    return await this.service.updateList(_id, rest);
  }

  @Mutation(() => List)
  async deleteList(@Args() { _id }: DeleteListArgs) {
    return await this.service.deleteList(_id);
  }

}
