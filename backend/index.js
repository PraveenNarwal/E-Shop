require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const order = require("./routes/order");
const address = require("./routes/address");
const product = require("./routes/product");
const user = require("./routes/user");

app.use(
  cors({
    origin: ["http://178.128.51.49:3000", "http://localhost:3000"],
  })
);

mongoose.connect(
  process.env.mongodb_url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);

app.use(express.json());
app.use(order, address, product, user);
app.listen(process.env.port, () => console.log("listening"));
