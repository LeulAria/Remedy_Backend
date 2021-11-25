import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

// app schema models
import * as AppModels from '../models'

// graphql defs
import { typeDefs, resolvers } from '../graphql'

export const startApolloServer = async (app: Express) => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return { req, AppModels }
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
  });

  await apolloServer.start()
  apolloServer.applyMiddleware({ app })
}