export function notFound(req, res, _next) {
  res.status(404).json({ ok: false, error: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, _req, res, _next) {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ ok: false, error: message });
}
