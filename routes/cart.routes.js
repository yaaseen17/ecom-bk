const controller = require("../controllers/cart.controller");
const getcartUser = require("../middleware/cartuser");
const authJwt = require("../middleware/authJwt");

module.exports = function (app) {
  app.get("/cart", [authJwt.verifyToken, getcartUser], controller.getCartItems);

  app.post(
    "/cart/:id",
    [authJwt.verifyToken, getcartUser],
    controller.addCartItem
  );

  app.delete(
    "/cart",
    [authJwt.verifyToken, getcartUser],
    controller.delCartItems
  );

  app.patch(
    "/cart/:id",
    [authJwt.verifyToken, getcartUser],
    controller.delCartItem
  );

  app.put(
    "/cart/:id",
    [authJwt.verifyToken, getcartUser],
    controller.changeQty
  );
};
