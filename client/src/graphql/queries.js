import gql from "graphql-tag";


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      token
      name
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $name: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        name: $name
        email: $email
        password: $password
        confirmPassword: $confirmPassword 
      }
    ){
      id email name token
    }
  }
`;

export const FETCH_CITIES_QUERY = gql`
query GetAllCities {
    getAllCities  {
     city 
     pop
     id
    }
  }
`;


export const CREATE_CITY_MUTATION = gql`
  mutation CreateCity($city: String!, $pop: String!) {
    createCity(city: $city, pop: $pop){
      id
      city
      pop
      
    }
  }
`;

export const UPDATE_CITY_MUTATION = gql`
  mutation UpdateCity($id: ID!, $city: String!, $pop: String!){
    updateCity(id: $id, city: $city, pop: $pop){
      id
      city
      pop
    }
  }
`;

export const DELETE_CITY_MUTATION = gql`
  mutation DeleteCity($id: ID!){
    deleteCity(id: $id){
      id
    }
  }
`;