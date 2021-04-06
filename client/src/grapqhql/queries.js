import gql from "graphql-tag";


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      token
    }
  }
`;


export const FETCH_CITIES_QUERY = gql`
  {
    getAllCities {
     city 
     pop
     id
    }
  }
`;


export const CREATE_CITY_MUTATION = gql`
  mutation createCity($city: String!, $pop: Int!){
    createCity(
      createCityInput: {
        city: $city
        pop: $pop
    }){
      city
    }
  }
`;