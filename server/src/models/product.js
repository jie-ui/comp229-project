import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    sku: { type: String, required: true, unique: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    category: { type: String, default: "General" },

    imageUrl: { type: String, default: "" } 

  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
