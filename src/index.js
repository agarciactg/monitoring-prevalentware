const { ApolloServer } = require('apollo-server')
const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')
const validateAndDecodeToken = require('./middleware/auth');

const port = process.env.PORT || 9090;


const server = new ApolloServer({ 
    resolvers, 
    typeDefs,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        const user = validateAndDecodeToken(token);
        return { user }; 
    },
});

server.listen({ port }, () => console.log(`Server runs at: http://localhost:${port}`));
