const express = require('express')
const path = require('path')
const { ApolloServer } = require('apollo-server-express')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { getUserFromToken , createToken } = require('./auth/auth')
const PORT = 3000

const typesArray = loadFilesSync(path.join( __dirname , "**/*.graphql"))
const resolversArray = loadFilesSync(path.join( __dirname , "**/*.resolvers.js"))
async function startApolloServer(){
    const app = express()
    
    const schema = makeExecutableSchema(
        {
            typeDefs:typesArray,
            resolvers:resolversArray,
        }
    );
       const server = new ApolloServer({
         schema:schema,
         context({req}){
            const token = req.headers.authorization
            const user = getUserFromToken(token)
            return { user , createToken}
         }
       })
       await server.start()
       server.applyMiddleware({app , path:'/api'})
       
       app.listen(PORT, () => {
           console.log('Our server is listening on port ' + PORT)
       })
}

startApolloServer()
/* 
Query 1

{

    products{
        id
        description
        price
    }
    orders{
        date
        subTotal
        items{
            product{
                id
                description
                price
                reviews{
                    rating
                    comment
                }
            }
            quantity

        }
    }
}

Query 2
{
    productsByID (id:"redShoe"){
         description
         price
    }
}
Query 3
{
    productsByPrice (minPrice:100 , maxPrice:200){
         id
         description
         price
    }
}
Query 4
{
  getPersons{
    ... on Buyer{
      age
      firstName
      itemsNumber
      lastName
      __typename
    }
    ... on Seller{
            age
      firstName
      level
      lastName
      __typename
    }
  }
}

Query 5

query ($fullName: String) {
  getPerson(fullName: "Mohammed Ali"){
    ... on Buyer{
      fullName
      __typename
    }
    ... on Seller{
      fullName
      __typename
    }
  }
}

Query 6

query ($itemId: ID!) {
  getItem(itemID: "1") {
    id
    buyer {
      fullName
      age
      itemsNumber
      __typename
    }
    seller {
      fullName
      age
      level
      __typename
    }
  }
}



Mutation 1

mutation {
    addNewProductReview (productID:"BlueJacket" ,comment: "good", rating:10){
            code
            status
            message
            product{
                reviews{
                    rating
                    comment
                }
            }


    }
}
Mutation 2
mutation{
    addNewProduct(id: "BlueJacket",description: "new style",price: 90){
           code
            status
            message
            product{
                id
                description
                price
            }
    }
}
*/