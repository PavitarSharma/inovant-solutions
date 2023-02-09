import { saveImages } from "../middleware/processImages.js";
import catchAsync from "../utils/catchAsync.js";
import Product from "../models/product.model.js";
import ErrorHandler from "../utils/errorHandler.js";

export const addProduct = catchAsync(async (req, res, next) => {
  let product = await Product.create(req.body);
  const url = req.protocol + "://" + req.get("host");
  if (product) {
    const path = `${product._id}`;
    const productImages = await saveImages(req.files, path);
    product.images = productImages.map((image) => ({ url: url + image }));
    await product.save();
    res.status(201).json({ success: true, product });
  }
});

export const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  if (!products) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({ success: true, products });
});

export const getProductDeatil = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found", 404));

  res.status(200).json({ success: true, product });
});

export const toogleActiveProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { active: req.body.active },
    { new: true, runValidators: true }
  );

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(201).send(product);
});
