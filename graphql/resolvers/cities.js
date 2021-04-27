const City = require("../../models/City");
const checkAuth = require("../../utils/check-auth");
const { ApolloError } = require('apollo-server');


module.exports =  {
  Query: {
    async getAllCities(){
      try {
        const allCities = await City.find();
        console.log("getAllCities resolver")
        return allCities;
      } 
      catch (err) {
        throw new Error(err);
      }
  },
  async getCity(_, { id }){
    try {
      const city = await City.findById(id);
      if(city) 
        return city;
      else
        throw new ApolloError("Datensatz nicht gefunden");
    } 
    catch (err) {
      throw new ApolloError(err);
    }
  },
  
},
  Mutation: {
    async createCity(_,  { city, pop }, context){
      const user = checkAuth(context);

      if (city === "" || pop === ""){
        throw new ApolloError("Fields must not be empty");
      }
      try {
        const newCity = new City({
          city,
          pop,
          user: user.id,
          createdAt: new Date().toISOString()
  
        });
        const newcity = await newCity.save();
        console.log("createCityResolver", newcity)
  
         //context.pubsub.publish("NEW_CITY", {newCity: newcity});
  
        return newcity;
      } 
      catch (err) {
        throw new ApolloError(err);
      }
      
    },
    async deleteCity(_, { id }, context){
      console.log(id)
      const user = checkAuth(context);
      try {
        const city = await City.findById(id);
        console.log(city)
        await city.remove();
        console.log(city)
        return city;
      } 
      catch (err) {
        console.error("deleteCity resolver error")
        throw new Error(err);
      }
    },
    async updateCity(_, { id, city, pop }, context ){
      const user = checkAuth(context);
      console.log("updateCity Resolver")
      if (city === "" || pop === ""){
        throw new ApolloError("Fields must not be empty");
      }

      try {
        let updatedCity = await City.findByIdAndUpdate(id, { city, pop }, { new:true });

        //context.pubsub.publish("CITY_UPDATE", { cityUpdate: updatedCity });

        console.log(updatedCity)

        return updatedCity; //fix: return new city not old
      } 
      catch (err) {
        throw new Error(err);
      }
    }
  },
  /*
  Subscription: {
    newCity: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_CITY")
    },
    cityUpdate: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("CITY_UPDATE")
    },
  }
  */
};

