module.exports = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey === "12345") return next();
  res.status(401).json({ message: "Unauthorized: Missing or invalid API key" });
};
