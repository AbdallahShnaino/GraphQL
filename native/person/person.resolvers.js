const usersModel = require("./person.model");
const {authenticated} = require('../auth/auth') 
module.exports = {
  Query: {
    getPersons: authenticated( () => {
      return usersModel.getPersons();
    }),
    getPerson: (_, { fullName }) => {
      return usersModel.getPersonWithName(fullName);
    },
    getItem: (_, { itemID }) => {
      return usersModel.getItem(itemID);
    },
  },
  entity: {
    __resolveType(person) {
      if (person.level) {
        return "Seller";
      }
      return "Buyer";
    },
  },
  Person: {
    __resolveType(person) {
      if (person.level) {
        return "Seller";
      }
      return "Buyer";
    },
  },
  Item: {
    seller(item) {
       return usersModel.getPersonWithName(item.seller.fullName);
    },
    buyer(item) {
        return usersModel.getPersonWithName(item.buyer.fullName);
    },
  },
  Mutation: {


    signup(_, {input}, {models, createToken}) {
        const existing = models.User.findOne({email: input.email})
  
        if (existing) {
          throw new Error('nope')  
        }
        const user = models.User.createOne({...input, verified: false, avatar: 'http'})
        const token = createToken(user)
        return {token, user}
      },
      signin(_, {input}, {models, createToken}) {
        const user = models.User.findOne(input)
  
        if (!user) {
          throw new Error('nope')  
        }
  
        const token = createToken(user)
        return {token, user}
      }
      
  }
};
