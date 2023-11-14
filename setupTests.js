// setupTests.js
const { ApolloServer } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const { typeDefs } = require('./src/schema');
const { resolvers } = require('./src/resolvers');
const validateAndDecodeToken = require('./src/middleware/auth');

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const user = validateAndDecodeToken(token);
    return { user };
  },
});

const { query, mutate } = createTestClient(server);

global.query = query;
global.mutate = mutate;
