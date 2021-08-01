const { login, signup } = require("../controllers/user");
const router = require("express").Router();

router.post("/users", signup);
router.post("/auth", login);

module.exports = router;
