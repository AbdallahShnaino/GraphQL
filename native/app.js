const express = require('express')
const path = require('path')
const { graphqlHTTP } = require('express-graphql')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { loadFilesSync } = require('@graphql-tools/load-files')

const app = express()
const PORT = 3000

const typesArray = loadFilesSync(path.join( __dirname , "**/*.graphql"))
const resolversArray = loadFilesSync(path.join( __dirname , "**/*.resolvers.js"))

const schema = makeExecutableSchema(
    {
        typeDefs:typesArray,
        resolvers:resolversArray,
    }
);

app.use('/api', graphqlHTTP({
    schema: schema,
}))

app.listen(PORT, () => {
    console.log('Our server is listening on port ' + PORT)
})

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
    addNewProductReview (productID:"redShoe" ,comment: "nice", rating:5){
         id
         description
         price
    }
}

*/