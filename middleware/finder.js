const db = require("../models");
const Product = db.Products;

getProduct = async (req, res, next) => {
  let products;
  try {
    products = await Product.findById(req.params.id);
    if (!products) {
      return res.status(404).json({ message: "cannot find product" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.product = products;
  next();
};

module.exports = getProduct;
