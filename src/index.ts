import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import express from 'express';
import { DataSource } from 'typeorm';
import { RegisterResolver } from './modules/User/Register';
import { User } from './entities/User';

const main = async () => {
  const AppDataSource = new DataSource({
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    username: 'oscar',
    password: 'password',
    database: 'graphql',
    port: 5432,
    synchronize: true,
    logging: true,
    entities: [User],
  });

  AppDataSource.initialize()
    .then(() => {
      console.log('connected to the database');
    })
    .catch((err) => console.log(err));

  const schema = await buildSchema({
    resolvers: [RegisterResolver],
  });

  const apolloServer = new ApolloServer({ schema });

  const app = express();
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server started on 4000');
  });
};

main();
