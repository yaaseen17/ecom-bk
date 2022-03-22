const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const getUser = require("../middleware/userfinder");
const authJwt = require("../middleware/authJwt");
const nodemailer = require("nodemailer");
const User = require("../models/user.model");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );
  app.post("/auth/signin", controller.signin);
  app.get("/auth/users", async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  app.patch(
    "/auth/users/:id",
    [getUser, authJwt.verifyToken],
    async (req, res) => {
      if (req.body.username != null) {
        res.user.username = req.body.username;
      }
      if (req.body.email != null) {
        res.user.email = req.body.email;
      }
      try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
  );
  app.delete(
    "/auth/users/:id",
    [getUser, authJwt.verifyToken],
    async (req, res) => {
      try {
        await res.user.remove();
        res.json({ message: "Deleted user" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  );
};
