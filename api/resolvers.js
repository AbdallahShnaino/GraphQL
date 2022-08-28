const User = require("../db/models/User");
const resolvers = {
  Query: {
    users: async function users() {
      return User.find();
    },
  },
  Mutation: {
    createUser: async function createUser(
      _,
      { firstName, lastName, username }
    ) {
      const user = new User({
        firstName: firstName,
        lastName: lastName,
        username: username,
      });
      user.save((e) => {
        if (e) {
          return {
            code: 500,
            status: false,
            message: "failed to save in database",
            user: {
              firstName: firstName,
              lastName: lastName,
              username: username,
            },
          };
        }
      });

      return {
        code: 200,
        status: true,
        message: "saved in database",
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
        },
      };
    },
    updateUser: async function updateUser(_, {
        lastUsername,
        user
    }) {
      var userData = await User.findOne({username:lastUsername})
      var { firstName, lastName , username } = user;
      firstName = (firstName == null) ? userData.firstName:firstName
      lastName = (lastName  == null) ? userData.lastName:lastName
      username = (username  == null) ? userData.username:username

        try{
          var up = await User.updateOne(
            { username: lastUsername },
            {
              $set: {
                firstName: firstName,
                lastName: lastName,
                username: username,
              },
            }
          );
          if (up.matchedCount == 1){
            return {
              code: 200,
              status: true,
              message: "update operation done successfully on database",
              user: {
                firstName: firstName,
                lastName: lastName,
                username: username,
              },
            };
          }else{
            return {
              code: 500,
              status: false,
              message: "failed to update user "+lastUsername + ' , Seems it is not found'
            };
          }

        }catch(error){
          return {
            code: 500,
            status: false,
            message: "failed to update user "+lastUsername,
          };
        }
 
      
    },
    deleteUser: async function deleteUser(_, { username }) {
      var deleteOperation = await User.deleteOne({ username: username });

      if (deleteOperation.acknowledged && deleteOperation.deletedCount == 1) {
        return {
          code: 200,
          status: true,
          message: "user " + username + " was deleted from database",
        };
      }

      return {
        code: 500,
        status: false,
        message: "Record doesn't exist or already deleted",
      };
    },
  },
  /* 
  Mutation: {
    createUser: async function createUser(
      _,
      { firstName, lastName, username }
    ) {
      const user = new User({
        firstName: firstName,
        lastName: lastName,
        username: username,
      });
      user.save().then(() => {
        return { firstName: firstName, lastName: lastName, username: username };
      });
    },
    updateUser: async function updateUser() {
      return {
        firstName: "",
        lastName: "",
        username: "",
      };
    },
    deleteUser: async function deleteUser() {
      return {
        firstName: "",
        lastName: "",
        username: "",
      };
    },
  },
*/
};

module.exports = resolvers;
