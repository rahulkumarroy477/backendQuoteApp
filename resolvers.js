const { Query } = require("./resolvers/Query");
const { Mutation } = require("./resolvers/Mutation");
const Quote = require("./models/Quote");

const resolvers = {
    Query,
    User: {
        quotes: async (usr) => Quote.find({by:usr._id})
    },
    Mutation,
};

module.exports = { resolvers };
