const gql = require("graphql-tag");


module.exports = gql`
  type Query {
    getAllCities: [City!]!
    getCity(id: ID, city: String, pop: Int): City!
  }  

  type City {
    id: ID!
    city: String
    pop: Int
    createdAt: String!
    username: String
  }

  input CityInput {
    city: String
    pop: Int
  }

  type User {
    id: ID!
    email: String!
    token: String!
    name: String!
    registerDate: String!
  }

  input RegisterInput {
    name: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    createCity(city: String!, pop: String!): City!
    deleteCity(id: ID!): String
    updateCity(id: ID!, input: CityInput!): City!
  }

  type Subscription {
    newCity: City!
    cityUpdate: City!
  }
`;

