const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    order_date: {
      type: Date,
      required: true,
      default: new Date(),
    },
    product_id: {
      type: String,
      required: true,
    },
    shipping_address_id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamp: true },
  { collection: "orders" }
);

module.exports = mongoose.model("Orders", orderSchema);
