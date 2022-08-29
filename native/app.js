const express = require('express')
const path = require('path')
const { ApolloServer } = require('apollo-server-express')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { loadFilesSync } = require('@graphql-tools/load-files')
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
         schema:schema
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