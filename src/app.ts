import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import dotenv from 'dotenv';
import { Container } from 'typedi';
import { buildSchema } from 'type-graphql';
import { CustomerResolver } from './api/resolvers/customerResolvers.js';
import { UserResolver } from './api/resolvers/userResolvers.js';
import { ListResolver } from './api/resolvers/listResolvers.js';
import { CardResolver } from './api/resolvers/cardResolvers.js';
import jwt from 'jsonwebtoken';
import { User } from './api/typedefs/userTypeDefs.js';

dotenv.config();

export interface MyContext {
    token?: string;
    user?: User;
}

const app = express();

export const authCheck = (ctx: MyContext) => {
    const user = ctx.user;
    if (!user) {
        throw new Error("Auth Error")
    }
}

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
            context: async ({ req }) => {
                const token = req.headers.authorization?.split(' ')[1];

                let user: User | null = null;

                if (token) {
                    try {
                        user = jwt.verify(token, process.env.JWT_SECRET!) as User;
                    } catch (err) {
                        console.error('Invalid token');
                    }
                }
                return { token, user };
            },
        }),
    );
};

export default app;
