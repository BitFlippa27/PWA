const City = require("./models/City");

const resolvers = {
    Query: {
       async getAllCities(){
        try {
          const allCities = await City.find();

          return allCities;
        } 
        catch (err) {
          console.error(err);
        }
      },
      async getCity(_, { id }){
        try {
          const city = await City.findById(id);
          
          return city;
        } 
        catch (err) {
          console.error(err);  
        }
      },
      
    },
    Mutation: {
      async createCity(_, { input}){
        const newCity = new City({ input });
        await newCity.save();

        return newCity;
      },
      async removeCity(_, { id }){
        try {
          const city = await City.findById(id);
          await city.remove();
          
          return city;
        } 
        catch (err) {
          console.error(err);
        }
      },/*
      async updateCity(_, { id, input  } ){
        try {
          let city = await City.findByIdAndUpdate(id, input, () => );

          return city;

        } 
        catch (err) {
          console.error
        }


      }
      */
    },
    
  };

  module.exports = resolvers;