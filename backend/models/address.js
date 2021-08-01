const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { collection: "address" },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
