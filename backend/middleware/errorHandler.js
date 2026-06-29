module.exports = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message)
  const status = err.status || 500
  res.status(status).json({
    error: err.message || "Internal Server Error",
  })
}
/**
 * Global Express error handling middleware.
 * Must be registered LAST in server.js (after all routes).
 * Called via next(err) from any route handler.
 */
module.exports = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message)
  const status = err.status || 500
  res.status(status).json({
    error: err.message || "Internal Server Error",
  })
}
