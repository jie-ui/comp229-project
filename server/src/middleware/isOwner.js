import mongoose from "mongoose";
import Order from "../models/Order.js";

export async function loadOrderIfOwner(req, res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ ok: false, error: "Invalid id" });

 
  const order = await Order.findById(id)
    .populate("items.product", "name price imageUrl");

  if (!order)
    return res.status(404).json({ ok: false, error: "Order not found" });

  if (order.user.toString() !== req.user.id)
    return res.status(403).json({ ok: false, error: "Forbidden: not your order" });

  req.order = order;
  next();
}
