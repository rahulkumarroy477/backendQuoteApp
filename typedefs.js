const { gql } = require('graphql-tag');

const typeDefs = gql`
    type Query{
        users: [User]
        user(_id:ID!): User
        quotes: [QuoteWithName]
        iquote(by:ID!): [Quote]
    }

    type QuoteWithName{
        name: String
        by: Idname
    }
    type Idname{
        _id: String
        firstname: String
    }
    type User{
        _id : ID!
        firstname: String!
        lastname: String!
        email: String!
        quotes: [QuoteWithId]
        password: String!
    }
    type QuoteWithId{
        _id: ID!
        name: String!
    }
    type Quote{
        name: String!
        by: ID!
    }
    type Token{
        token: String
    }
    type Mutation{
        signUpUser(userNew:UserInputSignUp!): User
        signInUser(userSignIn:UserInputSignIn!): Token
        addQuote(name: String!): String
        deleteQuote(quoteId: ID!): String
    }

    input UserInputSignUp{
        firstname:String!
        lastname:String!
        email:String!
        password:String!
    }
    
    input UserInputSignIn{
        email:String!
        password:String!
    }

`
module.exports = {
    typeDefs
}