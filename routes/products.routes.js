const { authJwt } = require("../middleware");
const { getProduct } = require("../middleware");
const Product = require("../models/products");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.delete(
    "/products/:id",
    [getProduct, authJwt.verifyToken, authJwt.isAdmin],
    async (req, res) => {
      try {
        await res.product.remove();
        res.json({ message: "Deleted product" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  );
  app.get("/products", async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  app.get("/products/:id", getProduct, (req, res) => {
    res.send(res.product);
  });
  app.post(
    "/products",
    [authJwt.verifyToken, authJwt.isAdmin],
    async (req, res) => {
      const product = await Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
        brand: req.body.brand,
        size: req.body.size,
      });

      try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
  );
  app.patch(
    "/products/:id",
    [authJwt.verifyToken, authJwt.isAdmin, getProduct],
    async (req, res) => {
      if (req.body.name != null) {
        res.product.name = req.body.name;
      }
      if (req.body.description != null) {
        res.product.description = req.body.description;
      }
      if (req.body.price != null) {
        res.product.price = req.body.price;
      }
      if (req.body.img != null) {
        res.product.img = req.body.img;
      }
      if (req.body.size != null) {
        res.product.size = req.body.size;
      }
      if (req.body.brand != null) {
        res.product.brand = req.body.brand;
      }
      try {
        const updatedProduct = await res.product.save();
        res.json(updatedProduct);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
  );
};
