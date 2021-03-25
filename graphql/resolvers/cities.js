const City = require("../../models/City");

module.exports = {
    Query: {
       async getAllCities(){
        try {
          const allCities = await City.find();

          return allCities;
        } 
        catch (err) {
          throw new Error(err);
        }
      },
      async getCity(_, { id }){
        try {
          const city = await City.findById(id);
          
          return city;
        } 
        catch (err) {
          throw new Error(err); 
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
          throw new Error(err);
        }
      },
      async updateCity(_, { id, input  } ){
        try {
          let city = await City.findByIdAndUpdate(id, input);

          return city;

        } 
        catch (err) {
          throw new Error(err);
        }


      }
      
    },
    
  };
