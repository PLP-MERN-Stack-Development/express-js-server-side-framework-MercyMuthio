const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductStats
} = require("../controllers/productsController");
const auth = require("../middleware/auth");

router.get("/", getAllProducts);
router.get("/search", searchProducts);
router.get("/stats", getProductStats);
router.get("/:id", getProductById);
router.post("/", auth, createProduct);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;
