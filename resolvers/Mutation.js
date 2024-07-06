const { addQuote } = require('./Quote/addQuote');
const { deleteQuote } = require('./Quote/deleteQuote');
const { signInUser } = require('./User/signIn');
const {signUpUser} = require('./User/signUp');

const Mutation = {
    signUpUser: async (_, { userNew }) => await signUpUser(userNew),
    signInUser: async (_, { userSignIn }, {res}) => await signInUser(userSignIn,res),

    addQuote: async (_, { name },context) => await addQuote(name,context),
    deleteQuote: async (_,{quoteId},context) => await deleteQuote(quoteId,context)
}

module.exports = {Mutation};