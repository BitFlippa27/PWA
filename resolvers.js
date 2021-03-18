const City = require("./models/City");

const resolvers = {
    Query: {
      cities: () => City.find({})
    },
    Mutation: {
      createCity: ({city, pop, zip, id}) => {
        const newCity = new City({city, pop, zip, id});
        newCity.save();

        return newCity;
      }
    }
  };

  module.exports = resolvers;