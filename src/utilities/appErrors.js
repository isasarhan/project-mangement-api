import { GraphQLError } from "graphql";


class AppError extends GraphQLError{
    constructor(message, status, logError){
        super(message, )
    }
}