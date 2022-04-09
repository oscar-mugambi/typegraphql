"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
let HelloResolver = class HelloResolver {
    async hello() {
        return await 'Hello World!!';
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => String, { name: 'helloworld', nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HelloResolver.prototype, "hello", null);
HelloResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], HelloResolver);
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
        entities: ['dist/entity/**/*.*'],
    });
    AppDataSource.initialize()
        .then(() => {
        console.log('connected to the database');
    })
        .catch((err) => console.log(err));
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [HelloResolver],
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