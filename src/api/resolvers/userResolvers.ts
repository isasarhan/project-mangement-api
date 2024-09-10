import { Service } from 'typedi'
import { UserService } from '../../services/userService.js'
import { Args, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { AddUserArgs, DeleteUserArgs, EditUserArgs, GetUserArgs, LoginUser, LoginUserArgs, PasswordResetArgs, RequestPasswordResetArgs, User } from '../typedefs/userTypeDefs.js'
import { authCheck, MyContext } from '../../app.js'

@Service()
@Resolver(() => User)
export class UserResolver {
    constructor(private readonly service: UserService) { }

    @Query(() => User, { nullable: true })
    async getUserById(@Args() { _id }: GetUserArgs) {
        return await this.service.getUserById(_id)
    }

    @Query(() => [User])
    async getAllUsers(@Ctx() ctx: MyContext) {
        authCheck(ctx)
        return await this.service.getAllUsers()
    }

    @Query(() => LoginUser)
    async signIn(@Args() data: LoginUserArgs) {
        return await this.service.signIn(data)
    }

    @Mutation(() => User)
    async register(@Args() data: AddUserArgs) {
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

    @Mutation(() => String)
    async requestPasswordReset(@Args() { email }: RequestPasswordResetArgs) {
        const result = await this.service.requestPasswordReset(email)
        if (result)
            return 'email sent successfully'
        else return 'failed to send email'
    }

    @Mutation(() => String)
    async passwordReset(@Args() { newPassword, token }: PasswordResetArgs) {
        const result = await this.service.resetPassword(newPassword, token)
        if (result)
            return 'password reset successfully'
        else return 'failed to reset password'
    }
}


