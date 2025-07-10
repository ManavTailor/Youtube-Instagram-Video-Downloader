import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express, { Application } from 'express';
import { buildSchema } from 'type-graphql';
import { MediaResolver } from './resolvers/mediaResolver';

async function main() {
  const app: Application = express();

  const schema = await buildSchema({
    resolvers: [MediaResolver],
    emitSchemaFile: true,
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

main();