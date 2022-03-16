const controller = require("../controllers/cart.controller");
const getUser = require("../middleware/userfinder");
const authJwt = require("../middleware/authJwt");

module.exports = function (app) {
  app.get("/cart", [authJwt.verifyToken, getUser], controller.getCartItems);

  app.post("/cart/:id", [authJwt.verifyToken, getUser], controller.addCartItem);

  app.delete("/cart", [authJwt.verifyToken, getUser], controller.delCartItems);

  app.patch(
    "/cart/:id",
    [authJwt.verifyToken, getUser],
    controller.delCartItem
  );

  app.put("/cart/:id", [authJwt.verifyToken, getUser], controller.changeQty);
};
