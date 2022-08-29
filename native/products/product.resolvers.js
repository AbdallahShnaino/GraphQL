const productModel = require('./product.model')

module.exports = {
    Query: {
        products: ()=>{
            return productModel.getProducts()
        },
        productsByPrice: (_,{minPrice,maxPrice})=>{
            return productModel.productsByPrice(minPrice,maxPrice)
        },
        productsByID: (_,{id})=>{
            return productModel.productsByID(id)
        },
    },
    Mutation: {
        addNewProductReview: (_,{productID, rating, comment})=>{
            return productModel.addNewProductReview(productID,rating,comment)
        },
        addNewProduct: (_,{id ,description ,price})=>{
            return productModel.addNewProduct(id ,description ,price)
        },
    }

}