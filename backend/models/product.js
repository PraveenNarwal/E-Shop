const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    available_items: {
      type: Number,
      required: true,
    },
    catagory: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamp: true },
  { collection: "address" }
);

module.exports = mongoose.model("Product", productSchema);
