// data/schema.js

//const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')
const { ApolloServer, gql } = require('apollo-server-express');
//const jwt = require('express-jwt')
const jwt = require('express-jwt')


// Define our schema using the GraphQL schema language
const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    nombre: String
    apellidos: String
    telefono: String
    fecha_nacimiento: String
  }
  type Query {
    me: User!,
    currentUser: User!,
    getUsers: [User],

  }

  type Mutation {
    signup(username: String!, email: String!, password: String!,

    apellidos: String, nombre: String, telefono: String fecha_nacimiento:String): User,

    login (email: String!, password: String!): LoginResponse,

    delete_user (username: String!): String,


  }
  type LoginResponse {
  token: String
  user: User
  }


`


//module.exports = makeExecutableSchema({ typeDefs, resolvers })
const server = new ApolloServer({ typeDefs, resolvers,
  context: ({ req }) => ({
    user: req.user
  }),
});

exports.server = server;
