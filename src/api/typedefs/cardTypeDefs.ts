import { IComment, TaskStatus } from '../../interfaces/index.js';
import { ArgsType, Field, InputType, ObjectType, registerEnumType } from 'type-graphql';
import { IsMongoId } from 'class-validator';
import { User } from './userTypeDefs.js';
import { Customer } from './customerTypeDefs.js';

@ObjectType()
export class Card {
  @Field(() => String)
  @IsMongoId()
  _id!: string;
 
  @Field(() => String)
  title!: string;

  @Field(() => Customer, {nullable:true})
  customer?: Customer;

  @Field(() => TaskStatus)
  status?: TaskStatus;

  @Field(() => [User])
  members?: User[];
 
  @Field(() => String)
  description?: string;

  @Field(() => [String])
  labels?: string[];

  @Field(() => Number)
  quantity?: number;

  @Field()
  type?: string;

  @Field(() => Date)
  dueDate?: Date;

  @Field(() => [Comment], {nullable:true})
  comments?: Comment[];

  @Field(() => Date)
  createdAt?: Date;
}


@ObjectType()
export class Comment implements IComment {
  @Field(() => String)
  @IsMongoId()
  _id!: string;
  
  @Field(() => String)
  user!: string;

  @Field(() => String)
  text!: string;

  @Field(() => Date, {nullable:true})
  createdAt?: Date;
}

@ArgsType()
export class GetCardArgs{
  @Field(()=>String)
  @IsMongoId()
  _id!:string
}

@ArgsType()
export class DeleCardArgs extends GetCardArgs{}

registerEnumType(TaskStatus, {
  name: 'TaskStatus', 
  description: 'The status of a task',
});
@ArgsType()
export class AddCardArgs {
  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  @IsMongoId()
  customer?: string;

  @Field(() => TaskStatus, { nullable: true })
  status?: TaskStatus;

  @Field(() => [String], { nullable: true })
  members?: string[];

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  labels?: string[];

  @Field(() => Number, { nullable: true })
  quantity?: number;

  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => Date, { nullable: true })
  dueDate?: Date;

  @Field(() => [CommentInput], { nullable: true })
  comments?: CommentInput[];

  @Field(() => Date, { nullable: true })
  createdAt?: Date;
}

@ArgsType()
export class EditCardArgs {
  @Field(() => String)
  @IsMongoId()
  _id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  @IsMongoId()
  customer?: string;

  @Field(() => TaskStatus)
  status?: TaskStatus;

  @Field(() => [String])
  members?: string[];

  @Field(() => String)
  description?: string;

  @Field(() => [String])
  labels?: string[];

  @Field(() => Number)
  quantity?: number;

  @Field(() => String)
  type?: string;

  @Field(() => Date)
  dueDate?: Date;

  @Field(() => [CommentInput])
  comments?: CommentInput[];
}

@InputType()
export class CommentInput {
  @Field(() => String)
  user!: string;

  @Field(() => String)
  text!: string;

  @Field(() => Date, {nullable:true})
  createdAt?: Date;
}