import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: ObjectId, ref: "Product", required: true },
    qty: { type: Number, required: true, min: 1 },
    priceAtPurchase: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: "User", required: true },
    items: { type: [orderItemSchema], required: true, validate: v => v.length > 0 },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
    total: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
