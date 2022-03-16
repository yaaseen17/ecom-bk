const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const getProduct = require("./finder");
const getUser = require("./userfinder");
module.exports = {
  authJwt,
  verifySignUp,
  getProduct,
  getUser,
};
