const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
  cities: [City!]!
}  

input City {
    city: String!
    pop: Int
    zip: Int
    id: ID!
  }

  type Mutation {
    createCity(input: City): City
  }
`;

module.exports  = typeDefs;