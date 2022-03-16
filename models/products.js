const mongoose = require("mongoose");
const Products = mongoose.model(
  "Products",
  new mongoose.Schema({
    name: String,
    description: String,
    price: String,
    img: String,
    brand: String,
    size: String,
  })
);
module.exports = Products;
