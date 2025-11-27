export function adminOnly(req, res, next) {
  if (req.user?.role === "Admin") return next();
  return res.status(403).json({ ok: false, error: "Forbidden: admin only" });
}
