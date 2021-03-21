const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
  getCities: [City!]!
  city: City
}  

type City {
  city: String!
  pop: Int!
  zip: Int!
  id: ID!
}

  type Mutation {
    createCity(city: String!, pop: Int!, zip: Int!): City!
  }
`;

module.exports  = typeDefs;