const { ApolloServer } = require('apollo-server')
const { typeDefs } = require('./schema')
// const typeDefs = require('../node_modules/.prisma/client'); 
const { resolvers } = require('./resolvers')

const port = process.env.PORT || 9090;

const server = new ApolloServer({ resolvers, typeDefs});

server.listen({ port }, () => console.log(`Server runs at: http://localhost:${port}`));
