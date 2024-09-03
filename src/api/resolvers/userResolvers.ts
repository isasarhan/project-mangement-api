import { Service } from 'typedi';
import { UserService } from '../../services/userService.js';
import { Args, Mutation, Query, Resolver } from 'type-graphql';
import { AddUserArgs, DeleteUserArgs, EditUserArgs, GetUserArgs, User } from '../typedefs/userTypeDefs.js';

@Service()
@Resolver(() => User)
export class UserResolver {
    constructor(private readonly service: UserService) { }

    @Query(() => User, { nullable: true })
    async getUserById(@Args() { _id }: GetUserArgs) {
        return await this.service.getUserById(_id)
    }

    @Query(() => [User])
    async getAllUsers() {
        return await this.service.getAllUsers()
    }

    @Mutation(() => User)
    async createUser(@Args() data: AddUserArgs) {
        return await this.service.createUser(data)
    }

    @Mutation(() => User)
    async updateUser(@Args() data: EditUserArgs) {
        const { _id, ...rest } = data
        return await this.service.updateUser(_id, rest)
    }

    @Mutation(() => User)
    async deleteUser(@Args() { _id }: DeleteUserArgs) {
        return await this.service.deleteUser(_id)
    }
}


