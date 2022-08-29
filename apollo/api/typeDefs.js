const { gql } = require("apollo-server-express");

const typeDefs = gql`
  
  interface crudOperationErrors{
    status: Boolean!
    code: Int!
    message: String!
  }
  type User {
    firstName: String
    lastName: String
    username: String
  }

  input UserInput {
    firstName: String
    lastName: String
    username: String
  }


  type UserOperations implements crudOperationErrors {
    status: Boolean!
    code: Int!
    message: String!
    user: User
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(firstName: String, lastName: String, username: String): UserOperations

    deleteUser(username: String): UserOperations

    updateUser(lastUsername: String, user: UserInput): UserOperations
  }
`;
module.exports = typeDefs;
