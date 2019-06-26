const express = require('express')
const schema = require('./data/schema')
const jwt = require('express-jwt')
require('./data/config');
var myModule = require('./data/schema');
var server = myModule.server;
const app = express()

const PORT = 3000

// graphql endpoint

app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}/api`)
})



const path = '/api';

app.use(path, jwt({
    secret: 'somesuperdupersecret',
    credentialsRequired: false
  }));

server.applyMiddleware({ app, path });




app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);