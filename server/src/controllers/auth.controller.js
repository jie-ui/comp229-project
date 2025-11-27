import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../models/user.js';


const sign = (u) =>
  jwt.sign({ id: u._id, role: u.role, email: u.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ ok: false, error: "Email already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const role = email === process.env.ADMIN_EMAIL ? "Admin" : "User";
  const user = await User.create({ name, email, password: hashed, role });

  return res.status(201).json({ ok: true, data: { token: sign(user), user } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ ok: false, error: "Invalid email or password" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ ok: false, error: "Invalid email or password" });

  return res.json({ ok: true, data: { token: sign(user), user } });
};

export const me = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  return res.json({ ok: true, data: { user } });
};
