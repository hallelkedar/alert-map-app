export default (err, req, res, _next) => {
  const status = err.statusCode || err.status || 500;
  console.log(`${req.url} | ${req.method} | ${status} - error: ${err.stack}`);
  const msg = status >= 500 ? "Internal server error" : err.message;

  return res.status(status).json({ error: msg });
};
