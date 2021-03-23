const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    getAllCities: [City!]!
    getCity(id: ID, city: String, zip: Int, pop: Int): City!
    createCity(city: String!, zip: Int!, pop: Int! ): City!
  }  

  type City {
    id: ID!
    city: String!
    pop: Int!
    zip: Int! 
  }

  type CityProp {
    city: String!
  }

  type ZipProp {
    zip: Int!
  }

  type PopProp {
    pop: Int!
  }

  input CityInput {
    city: String
    pop: Int
    zip: Int 
  }


  type Mutation {
    createCity(input: CityInput!): City!
    removeCity(id: ID!): City!
    updateCity(id: ID!, input: CityInput!): City!
  }
`;

module.exports  = typeDefs;