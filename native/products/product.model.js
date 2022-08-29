
 const products =  [
    {
        id: "redShoe",
        description: "Red shoe",
        price: 80
    },
{
        id: "greenHat",
        description: "Green Hat",
        price: 120.33
    }
]

function getProducts (){
    return products
}
function productsByPrice(minPrice,maxPrice){
    return products.filter(product =>{
        return product.price < maxPrice && product.price > minPrice
    })
}
function productsByID(id){
    return products.find(product => product.id === id )
}
function addNewProductReview (productID, rating, comment){
    var response = {}
    var inside = false
    products.find(product => {
        if( product.id === productID ){
            inside = true
            console.log('product found!')
            try{
                product.reviews.push(
                    {
                        rating:rating,
                        comment:comment
                    }
                ) 
                console.log('product has comment before!')

            }catch(e){
                product.reviews = []
                product.reviews.push(
                    {
                        rating:rating,
                        comment:comment
                    }
                ) 
                console.log('product doesnt have comment before!' , product)

            }
            console.log('normal flow!')

            response =  {
                    code: 200,
                    status: true,
                    message: 'new comment added',
                    product: product
                }          
        }
     })
     if (inside == false){
        response =  {
            code: 404,
            status: false,
            message: 'unknown product'
        } 
     }
     return response
}
function addNewProduct (id ,description ,price){
    var newProduct = {
        id,
        description,
        price,
        reviews:[]
    }
    products.push(newProduct)
   return {
        code: 200,
        status: true,
        message: 'new comment added',
        product: newProduct
    }   
}
module.exports = {
    getProducts,
    productsByPrice,
    productsByID,
    addNewProductReview,
    addNewProduct,
}