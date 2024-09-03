import { ObjectType, Field, ID, ArgsType, GraphQLISODateTime } from 'type-graphql';
import { IsMongoId } from 'class-validator';
import { IUser } from '../../interfaces/index.js';

@ObjectType()
export class User implements IUser {
  @Field(() => ID)
  _id!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  username!: string;

  @Field(() => String)
  password!: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;
}

@ArgsType()
export class EditUserArgs {
  @Field(() => ID)
  _id!: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  password!: string;

  @Field(() => GraphQLISODateTime, { nullable: true }) // Updated type
  createdAt?: Date;
}

@ArgsType()
export class AddUserArgs {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  username!: string;

  @Field(() => String, { nullable: true })
  password!: string;

  @Field(() => GraphQLISODateTime, { nullable: true }) // Updated type
  createdAt?: Date;
}

@ArgsType()
export class GetUserArgs {
  @Field(() => ID)
  @IsMongoId()
  _id!: string;
}

@ArgsType()
export class DeleteUserArgs extends GetUserArgs { }
