import { IList } from '../../interfaces/index.js';
import { ArgsType, Field, GraphQLISODateTime, ObjectType } from 'type-graphql';
import { IsMongoId } from 'class-validator';

@ObjectType()
export class List implements IList {
  @IsMongoId()
  _id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => [String])
  @IsMongoId()
  cards?: string[];

  @Field(() => GraphQLISODateTime)
  createdAt?: Date;
}

@ArgsType()
export class AddListArgs {
  @Field(() => String)
  title!: string;

  @Field(() => [String])
  @IsMongoId()
  cards?: string[];

  @Field(() => GraphQLISODateTime)
  createdAt?: Date;
}

@ArgsType()
export class EditListArgs {
  @Field(() => String)
  @IsMongoId()
  _id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => [String])
  @IsMongoId()
  cards?: string[];

  @Field(() => GraphQLISODateTime)
  createdAt?: Date;
}

@ArgsType()
export class GetListArgs {
  @Field(() => String)
  @IsMongoId()
  _id!: string;
}

@ArgsType()
export class DeleteListArgs extends GetListArgs{

}