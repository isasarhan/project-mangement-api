import { Service } from "typedi";
import { Args, Mutation, Query, Resolver } from "type-graphql";
import { AddCustomerArgs, Customer, DeleteCustomerArgs, EditCustomerArgs, GetCustomerArgs } from "../typedefs/customerTypeDefs.js";
import { CustomerService } from "../../services/customerService.js";

@Service()
@Resolver(() => Customer)
export class CustomerResolver {
    constructor(private readonly service: CustomerService) { }

    @Query(() => Customer, { nullable: true })
    async getCustomerById(@Args() { _id }: GetCustomerArgs) {
        return await this.service.getCustomerById(_id);
    }

    @Query(() => [Customer])
    async getAllCustomers() {
        return await this.service.getAllCustomers();
    }

    @Mutation(() => Customer)
    async createCustomer(@Args() data: AddCustomerArgs) {
        return await this.service.createCustomer(data);
    }

    @Mutation(() => Customer)
    async updateCustomer(@Args() data: EditCustomerArgs) {
        const { _id, ...rest } = data;
        return await this.service.updateCustomer(_id, rest);
    }

    @Mutation(() => Customer)
    async deleteCustomer(@Args() { _id }: DeleteCustomerArgs) {
        return await this.service.deleteCustomer(_id);
    }
}
