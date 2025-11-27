import mongoose from "mongoose";
import Product from "../models/Product.js";
export const createProduct = async (req, res) => {
  try {
    const p = await Product.create(req.body);
    res.status(201).json({ ok: true, data: p });
  } catch (err) {
    console.error("Create product error:", err.message);
    res.status(400).json({ ok: false, error: err.message });
  }
};


export const listProducts = async (req, res) => {
  const { q, category, page = 1, limit = 10 } = req.query;
  const filter = {};

  if (q) filter.name = { $regex: q, $options: "i" };

  if (category) {
    filter.category = { $regex: `^${category}$`, $options: "i" };
  }

  const data = await Product.find(filter)
    .skip((+page - 1) * +limit)
    .limit(+limit)
    .sort({ createdAt: -1 });

  res.json({ ok: true, data });
};


export const getProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ ok: false, error: "Invalid id" });
  const p = await Product.findById(id);
  if (!p) return res.status(404).json({ ok: false, error: "Product not found" });
  res.json({ ok: true, data: p });
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ ok: false, error: "Invalid id" });
  const p = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!p) return res.status(404).json({ ok: false, error: "Product not found" });
  res.json({ ok: true, data: p });
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ ok: false, error: "Invalid id" });
  const p = await Product.findByIdAndDelete(id);
  if (!p) return res.status(404).json({ ok: false, error: "Product not found" });
  res.status(204).end();
};
