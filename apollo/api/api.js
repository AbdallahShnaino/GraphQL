const { ApolloServer } = require('apollo-server-express');
const express = require('express')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const mongoose = require('mongoose');
const app = express()
const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];


  const {
    ApolloServerPluginLandingPageLocalDefault
  } = require('apollo-server-core');
  
  async function startApolloServer() {
    const app = express();
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      csrfPrevention: true,
      cache: 'bounded',
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ],
    });
    await mongoose.connect('mongodb://localhost:27017/test1');

        await server.start()
        server.applyMiddleware({ app });
        app.listen(4000 , ()=>{
            console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
            return { server, app };

        })
 
  }
  startApolloServer()