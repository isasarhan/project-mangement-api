import express from 'express'
import cors from 'cors'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import dotenv from 'dotenv'
import { Container } from 'typedi';
import { buildSchema } from 'type-graphql';
import { CustomerResolver } from './api/resolvers/customerResolvers.js';
import { IUser } from './interfaces/index.js';
import { UserResolver } from './api/resolvers/userResolvers.js';
import { ListResolver } from './api/resolvers/listResolvers.js';
import { CardResolver } from './api/resolvers/cardResolvers.js';

dotenv.config()

export interface MyContext {
    token?: String;
    user?: IUser;
}

const app = express();
export const startApolloServer = async (httpServer: any) => {
    const schema = await buildSchema({
        resolvers: [CustomerResolver, UserResolver, ListResolver, CardResolver],
        container: Container,
    });

    const server = new ApolloServer<MyContext>({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ token: req.headers.token }),
        }),
    );
}
export default app