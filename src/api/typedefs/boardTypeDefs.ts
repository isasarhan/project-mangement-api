import { ArgsType, Field, GraphQLISODateTime, ObjectType } from 'type-graphql';
import { IsMongoId } from 'class-validator';
import { List } from './listTypeDefs.js';
import { User } from './userTypeDefs.js';

@ObjectType()
export class Board {

    @Field(() => String)
    @IsMongoId()
    _id!: string

    @Field(() => String)
    title!: string;

    @Field(() => [List])
    lists?: List[]

    @Field(() => [User])
    users?: User[]

    @Field(() => GraphQLISODateTime)
    createdAt?: Date
}


@ArgsType()
export class AddBoardArgs{
    @Field(() => String)
    title!: string;

    @Field(() => [List])
    lists?: string[]

    @Field(() => [String])
    users?: string[]

    @Field(() => GraphQLISODateTime)
    createdAt?: Date
}

@ArgsType()
export class EditBoardArgs{
    @Field(() => String)
    @IsMongoId()
    _id!: string

    @Field(() => String)
    title!: string;

    @Field(() => [List])
    lists?: string[]

    @Field(() => [User])
    users?: string[]

    @Field(() => GraphQLISODateTime)
    createdAt?: Date
}

@ArgsType()
export class GetBoardArgs{
    @Field(() => String)
    @IsMongoId()
    _id!: string
}

@ArgsType()
export class DeleteBoardArgs extends GetBoardArgs{}