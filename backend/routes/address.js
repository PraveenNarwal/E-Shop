const { addAddress } = require("../controllers/address");
const auth = require("../middleware/auth");
const router = require("express").Router();

router.post("/address", auth, addAddress);

module.exports = router;
