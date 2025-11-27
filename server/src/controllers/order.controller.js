import mongoose from "mongoose";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

// helper: build items with priceAtPurchase and compute total
async function buildItemsAndTotal(items) {
  if (!Array.isArray(items) || items.length === 0)
    throw Object.assign(new Error("Items required"), { statusCode: 400 });

  const ids = items.map(i => i.product);
  // validate ids
  for (const id of ids) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Object.assign(new Error("Invalid product id"), { statusCode: 400 });
    }
  }
  const products = await Product.find({ _id: { $in: ids } });
  const priceMap = new Map(products.map(p => [p._id.toString(), p.price]));

  const ready = items.map(i => {
    const price = priceMap.get(i.product);
    if (price == null) throw Object.assign(new Error("Product not found"), { statusCode: 404 });
    if (i.qty <= 0) throw Object.assign(new Error("qty must be >= 1"), { statusCode: 400 });
    return { product: i.product, qty: i.qty, priceAtPurchase: price };
  });

  const total = ready.reduce((s, r) => s + r.qty * r.priceAtPurchase, 0);
  return { ready, total };
}

export const createOrder = async (req, res) => {
  const { items } = req.body;
  const { ready, total } = await buildItemsAndTotal(items);
  const order = await Order.create({
    user: req.user.id,
    items: ready,
    total,
    status: "pending"
  });
  res.status(201).json({ ok: true, data: order });
};

export const listMyOrders = async (req, res) => {
  const data = await Order.find({ user: req.user.id })
    .populate("items.product", "name price imageUrl")
    .sort({ createdAt: -1 });

  res.json({ ok: true, data });
};
export const getMyOrder = async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
    user: req.user.id,
  }).populate("items.product", "name price imageUrl");

  if (!order)
    return res.status(404).json({ ok: false, error: "Order not found" });

  res.json({ ok: true, data: order });
};

export const updateMyOrder = async (req, res) => {
  const order = req.order;
  if (order.status !== "pending")
    return res.status(403).json({ ok: false, error: "Only pending orders can be updated" });

 
  if (req.body.items) {
    const { ready, total } = await buildItemsAndTotal(req.body.items);
    order.items = ready;
    order.total = total;
  }
  if (req.body.status) {
    order.status = req.body.status;
  }
  await order.save();
  res.json({ ok: true, data: order });
};

export const deleteMyOrder = async (req, res) => {
  await req.order.deleteOne();
  res.status(204).end();
};
