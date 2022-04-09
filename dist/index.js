"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const Register_1 = require("./modules/User/Register");
const User_1 = require("./entities/User");
const main = async () => {
    const AppDataSource = new typeorm_1.DataSource({
        name: 'default',
        type: 'postgres',
        host: 'localhost',
        username: 'oscar',
        password: 'password',
        database: 'graphql',
        port: 5432,
        synchronize: true,
        logging: true,
        entities: [User_1.User],
    });
    AppDataSource.initialize()
        .then(() => {
        console.log('connected to the database');
    })
        .catch((err) => console.log(err));
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [Register_1.RegisterResolver],
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({ schema });
    const app = (0, express_1.default)();
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log('server started on 4000');
    });
};
main();
//# sourceMappingURL=index.js.map