const cityResolvers = require("./cities");
const userResolvers = require("./users");

module.exports = {
    Query: {
        ...cityResolvers.Query
    },
    Mutation: {
        ...cityResolvers.Mutation,
        ...userResolvers.Mutation
    }
};