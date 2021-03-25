const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    getAllCities: [City!]!
    getCity(id: ID, city: String, pop: Int): City!
  }  

  type City {
    id: ID!
    city: String
    pop: Int 
  }
  type User {
    id: ID!
    email: String!
    token: String!
    name: String!
    createdAt: String!
  }

  input CityInput {
    city: String
    pop: Int!
  }

  input RegisterInput {
    name: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Mutation {
    login(email: String!, password: String!): User!
    register(registerInput: RegisterInput): User!
    createCity(input: CityInput!): City!
    removeCity(id: ID!): City!
    updateCity(id: ID!, input: CityInput!): City!
  }
`;
