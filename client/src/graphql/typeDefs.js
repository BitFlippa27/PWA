import gql from "graphql-tag";

export default gql`
  type City {
    id: ID!
    city: String!
    pop: String!
}
  type Query {
    getAllCities: [City!]!
    getCity(city: String, pop: Int, id: ID,): City!
}  
`;