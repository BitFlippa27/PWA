const City = require("../../models/City");
const checkAuth = require("../../utils/check-auth");

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
        throw new Error("Datensatz nicht gefunden");
    } 
    catch (err) {
      throw new Error(err);
    }
  },
  
},
  Mutation: {
    async createCity(_,  { city, pop }, context){
      const user = checkAuth(context);
      console.log("createCity resolver");

      if (city === "" || pop === ""){
        throw new Error("Fields must not be empty");
      }

      const newCity = new City({
        city,
        pop,
        user: user.id,
        createdAt: new Date().toISOString()

      });
       const newcity = await newCity.save();

       context.pubsub.publish("NEW_CITY", {newCity: newcity});

      return newcity;
    },
    async deleteCity(_, { id }, context){
      const user = checkAuth(context);
      try {
        const city = await City.findById(id);
        await city.remove();
        
        return "City removed";
      } 
      catch (err) {
        throw new Error(err);
      }
    },
    async updateCity(_, { id, updatedCity, updatedPop }, context ){
      const user = checkAuth(context);
      console.log("updateCity Resolver")
      if (updatedCity === "" || updatedPop === ""){
        throw new Error("Fields must not be empty");
      }

      try {
        let city = await City.findByIdAndUpdate(id, { updatedCity, updatedPop });

        context.pubsub.publish("CITY_UPDATE", {
          cityUpdate: city
        });

        return city; //fix: return new city not old
      } 
      catch (err) {
        throw new Error(err);
      }
    }
  },
  Subscription: {
    newCity: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_CITY")
    },
    cityUpdate: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("CITY_UPDATE")
    },
  }
};

