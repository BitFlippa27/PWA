const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
  getAllCities: [City!]!
  getCity(id: ID!): City!
  createCity(city: String!, zip: Int!, pop: Int! ): City!
}  

type City {
  id: ID!
  city: String!
  pop: Int!
  zip: Int!
  
}

  type Mutation {
    createCity(city: String!, pop: Int!, zip: Int!): City!
  }
`;

module.exports  = typeDefs;