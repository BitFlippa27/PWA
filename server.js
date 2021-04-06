const { ApolloServer, PubSub } = require('apollo-server');
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");
const connectDB = require("./config/mongoDB");

//const pubsub = new PubSub();

const startServer = async () => {
  try {

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => ({ req, pubsub })
    });

    await connectDB();

    server.listen({ port: 5555 }).then(res => {
      console.log(`🚀 Server ready at ${res.url}`);
    });
  } 
  catch (err) {
    console.error(err);
  }
};

startServer();


