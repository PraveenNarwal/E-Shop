const {
  getProducts,
  getProductsCatagories,
  getProductsById,
  saveProducts,
  updateProductById,
  deleteProductById,
} = require("../controllers/product");

const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

const router = require("express").Router();

router.get("/products", getProducts);
router.get("/products/catagories", getProductsCatagories);
router.get("/products/:id", getProductsById);
router.post("/products", auth, admin, saveProducts);
router.put("/products/:id", auth, admin, updateProductById);
router.delete("/products/:id", auth, admin, deleteProductById);

module.exports = router;
