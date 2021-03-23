const City = require("./models/City");

const resolvers = {
    Query: {
      getAllCities: () => City.find(),
      getCity: (_, {id}) => City.findById(id)
    },
    Mutation: {
      createCity: async (_, {city, pop, zip}) => {
        const newCity = new City({city, pop, zip});
        await newCity.save();

        return newCity;
      }
    }
  };

  module.exports = resolvers;