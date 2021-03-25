const City = require("../../models/City");
const checkAuth = require("../../utils/check-auth");

module.exports =  {
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
    async createCity(_, { city, pop }, context){
      const user = checkAuth(context);
      console.log(user);

      const newCity = new City({
        city,
        pop,
        user: user.id,
        createdAt: new Date().toISOString()

      });
       const newcity = await newCity.save();

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
    async updateCity(_, { id, input }, context ){
      const user = checkAuth(context);
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

