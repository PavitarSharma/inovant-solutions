import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Please enter product price."],
    },

    description: {
      type: String,
      required: [true, "Please enter product description."],
    },

    sku: {
      type: String,
      required: [true, "Please enter product description."],
    },

    images: [
      {
        id: { type: String },
        url: { type: String },
      },
    ],

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
