import { ObjectType, Field, ID, ArgsType, GraphQLISODateTime } from 'type-graphql'
import { IsMongoId } from 'class-validator'
import { Customer } from './customerTypeDefs.js'


@ObjectType()
export class User {
  @Field(() => ID)
  _id!: string

  @Field(() => String)
  email!: string

  @Field(() => String)
  username!: string

  @Field(() => String)
  password!: string

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => [Customer])
  customers?: Customer[]
}
@ObjectType()
export class LoginUser {
  @Field()
  user!: User

  @Field(() => String)
  token!: string
}
@ArgsType()
export class EditUserArgs {
  @Field(() => ID)
  _id!: string

  @Field(() => String, { nullable: true })
  email?: string

  @Field(() => String, { nullable: true })
  username?: string

  @Field(() => String, { nullable: true })
  password!: string

  @Field(() => GraphQLISODateTime, { nullable: true }) // Updated type
  createdAt?: Date
}

@ArgsType()
export class AddUserArgs {
  @Field(() => String)
  email!: string

  @Field(() => String)
  username!: string

  @Field(() => String)
  password!: string

  @Field(() => GraphQLISODateTime, { nullable: true }) // Updated type
  createdAt?: Date

  @Field(() => [ID], {nullable:true})
  @IsMongoId()
  customers?: [string]

}

@ArgsType()
export class GetUserArgs {
  @Field(() => ID)
  @IsMongoId()
  _id!: string
}
@ArgsType()
export class RequestPasswordResetArgs {
  @Field(() => String)
  email!: string
}
@ArgsType()
export class PasswordResetArgs {
  @Field(() => String)
  newPassword!: string
  
  @Field(() => String)
  token!: string
}

@ArgsType()
export class LoginUserArgs {
  @Field(() => String)
  email!: string

  @Field(() => String, { nullable: true })
  username!: string

  @Field(() => String)
  password!: string

}

@ArgsType()
export class DeleteUserArgs extends GetUserArgs { }
