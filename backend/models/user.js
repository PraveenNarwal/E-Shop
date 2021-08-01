const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
  { collection: "user" }
);

userSchema.pre("save", function (next) {
  var user = this;
  if (user.isModified("password")) {
    user.password = bcrypt.hashSync(user.password, 12);
    next();
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compareSync(plainPassword, this.password);
};

module.exports = mongoose.model("Users", userSchema);
