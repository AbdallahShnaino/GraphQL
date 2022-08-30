const jwt = require("jsonwebtoken");
const secret = "catpack";

/* */
const { getPersonWithName } = require('../person/person.model')

const createToken = ({ id, role }) => jwt.sign({ id, role }, secret);

const getUserFromToken = (token) => {
  try {
    const user = jwt.verify(token, secret);
    return getPersonWithName(user.fullName)
  } catch (e) {
    return null;
  }
};

const authenticated = (next) => (root, args, context, info) => {
  if (!context.user) {
    throw new Error("you are not authenticated!");
  }
  return next();
};

const authorized = (role, next) => (root, args, context, info) => {};

module.exports = {
  getUserFromToken,
  authenticated,
  authorized,
  createToken,
};
