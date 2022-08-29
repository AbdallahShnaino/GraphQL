
const orders = [
    {
        date: "10/02/2020",
        subTotal: "22.4",
        items: [
            {
                product: {
                    id: "greenHat",
                    description: "Green Hat",
                    price: 120.33,
                    reviews: [
                        {
                            rating: 2,
                            comment: 'good'
                        }
                    ]
                },
                quantity: 10
            }
        ]
    }
]

function getOrders (){
    return orders
}
module.exports = {getOrders}