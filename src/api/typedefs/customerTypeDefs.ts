import { ObjectType, Field, ID, Int, ArgsType } from 'type-graphql';
import { ICustomer } from '../../interfaces/index.js';
import { IsMongoId, Length } from 'class-validator';
import { User } from './userTypeDefs.js';

@ObjectType()
export class Customer implements ICustomer {
  @Field(() => ID)
  _id?: string;

  @Length(3)
  @Field(() => String)
  name!: string;

  @Field({ nullable: true })
  residence?: string;

  @Field({ nullable: true })
  number?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => User)
  user?: User
}

@ArgsType()
export class AddCustomerArgs {
  @Field(() => String)
  name!: string;

  @Field({ nullable: true })
  residence?: string;

  @Field({ nullable: true })
  number?: string;
 
  @Field({ nullable: true })
  description?: string;

  @Field(() => ID, { nullable: false })
  @IsMongoId()
  user!: string

  
}

@ArgsType()
export class EditCustomerArgs {
  @Field(() => ID, { nullable: false })
  @IsMongoId()
  _id!: string

  @Field(() => String)
  name!: string;

  @Field({ nullable: true })
  residence?: string;

  @Field({ nullable: true })
  number?: string;

  @Field({ nullable: true })
  description?: string;
}

@ArgsType()
export class GetCustomerArgs {
  @Field(() => ID, { nullable: false })
  @IsMongoId()
  _id!: string
}

@ArgsType()
export class DeleteCustomerArgs extends GetCustomerArgs { }
