const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { typeDefs } = require('./typedefs');
const { resolvers } = require('./resolvers');
const connectDB = require('./dbconnect');
require('dotenv').config();

// Database connection
connectDB(process.env.MONGO_URI);

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req}) => {
            return req;
        },
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: ({req}) => (req),
    });

    console.log(`Server ready at ${url}`);
}

startServer();
