import { Service } from "typedi"
import { CardService } from "../../services/cardService.js"
import { Args, Mutation, Query, Resolver } from "type-graphql"
import { AddCardArgs, Card, DeleCardArgs, EditCardArgs, GetCardArgs } from "../typedefs/cardTypeDefs.js"

@Service()
@Resolver(() => Card)
export class CardResolver {
    constructor(private readonly service: CardService) { }

    @Query(() => Card)
    async getCardById(@Args() { _id }: GetCardArgs) {
        return await this.service.getCardById(_id)
    }
    @Query(() => [Card])
    async getAllCards() {
        return await this.service.getAllCards()
    }
    @Mutation(() => Card)
    async createCard(@Args() data: AddCardArgs) {
        return await this.service.createCard(data)
    }

    @Mutation(() => Card)
    async updateCard(@Args() data: EditCardArgs) {
        const { _id, ...rest } = data
        return await this.service.updateCard(_id, rest)
    }

    @Mutation(() => Card)
    async deleteCard(@Args() { _id }: DeleCardArgs) {
        return await this.service.deleteCard(_id)
    }

}


