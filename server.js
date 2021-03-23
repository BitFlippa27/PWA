const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
//import { resolvers }  from "./resolvers";
//import { typeDefs } from "./typeDefs";
//const { typeDefs, resolvers } = require('./schema');
const resolvers = require("./resolvers");
const typeDefs = require("./schema");
const connectDB = require("./config/db");


const startServer = async () => {
  try {
    const app = express();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    server.applyMiddleware({ app });
    
    await connectDB();

    app.use((req, res) => {
      res.status(200);
      res.send('Hello!');
      res.end();
    });

    app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
  } catch (err) {
    console.error(err);
  }
};

startServer();


