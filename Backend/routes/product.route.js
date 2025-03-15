import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct, // Added this
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct); // Fixed here
router.delete("/:id", deleteProduct); // Fixed here

export default router;
