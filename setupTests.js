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
    console.log(req, "+++++++++++++++++++")
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQcmV2YWxlbnR3YXJlIiwiaWF0IjoxNjkyOTEwNDcwLCJleHAiOjE3MjQ0NDY0NzAsImF1ZCI6Ind3dy5wcmV2YWxlbnR3YXJlLmNvbSIsInN1YiI6ImpvaG4uamFja3NvbkB0ZXN0LmNvbSIsIkdpdmVuTmFtZSI6IkpvaG4iLCJTdXJuYW1lIjoiSmFja3NvbiIsIkVtYWlsIjoiam9obi5qYWNrc29uQHRlc3QuY29tIiwiUm9sZSI6ImNsbHBuMW1mcDAwMDIzODdlZXVkZW9ybmQifQ.wPxeeEmQP1KUnKP_wPgqDtKK7dc-33xvhFe9pmxg14c" || '';
    const user = validateAndDecodeToken(token);
    return { user };
  },
});

const { query } = createTestClient(server);



module.exports = {
    query
};