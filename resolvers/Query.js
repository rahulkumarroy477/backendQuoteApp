const User = require('../models/User');
const Quote = require('../models/Quote');

const Query = {
    users: async () => await User.find({}),
    user: async (_, {_id}) => await User.findOne({_id}),
    quotes: async () => await Quote.find({}).populate('by','_id firstname'),
    iquote: async (_, {by}) => await Quote.find({by})
}

module.exports = {
    Query
}