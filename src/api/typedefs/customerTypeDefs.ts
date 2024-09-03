import { ObjectType, Field, ID, Int, ArgsType } from 'type-graphql';
import { ICustomer } from '../../interfaces/index.js';
import { IsMongoId } from 'class-validator';

@ObjectType()
export class Customer implements ICustomer {
  @Field(() => ID)
  _id?: string;

  @Field(() => String)
  name!: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  number?: string;

  @Field({ nullable: true })
  description?: string;
}

@ArgsType()
export class AddCustomerArgs {
  @Field(() => String)
  name!: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  number?: string;

  @Field({ nullable: true })
  description?: string;
}

@ArgsType()
export class EditCustomerArgs {
  @Field(() => ID, { nullable: false })
  @IsMongoId()
  _id!: string

  @Field(() => String)
  name!: string;

  @Field({ nullable: true })
  location?: string;

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
