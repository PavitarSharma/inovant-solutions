import express from "express";
import * as productController from "../controllers/product.controller.js";
import fileExtLimiter from "../middleware/fileExtLimiter.js";
import fileSizeLimiter from "../middleware/fileSizeLimiter.js";
import filesPayloadExists from "../middleware/filesPayloadExists.js";

const router = express.Router();

router.post(
  "/",
  filesPayloadExists,
  fileSizeLimiter,
  fileExtLimiter([".png", ".jpg", ".jpeg", ".PNG", ".JPEG", ".JPG"]),
  productController.addProduct
);

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductDeatil);

router.patch("/:id", productController.toogleActiveProduct);

export default router;
