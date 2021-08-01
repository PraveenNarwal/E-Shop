const router = require("express").Router();
const { saveOrder } = require("../controllers/orders");
const auth = require("../middleware/auth");

router.post("/orders", auth, saveOrder);

module.exports = router;
