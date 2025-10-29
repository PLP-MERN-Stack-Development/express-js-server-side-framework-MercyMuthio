const { NotFoundError, ValidationError } = require("../utils/customErrors");

let products = []; // In-memory data for now

// GET /api/products
exports.getAllProducts = (req, res) => {
  const { category, page = 1, limit = 5 } = req.query;

  let filtered = category ? products.filter(p => p.category === category) : products;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + Number(limit));

  res.json({ total: filtered.length, page: Number(page), products: paginated });
};

// GET /api/products/:id
exports.getProductById = (req, res, next) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return next(new NotFoundError("Product not found"));
  res.json(product);
};

// POST /api/products
exports.createProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !price || !category) return next(new ValidationError("Missing required fields"));
  const newProduct = { id: Date.now(), name, description, price, category, inStock };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

// PUT /api/products/:id
exports.updateProduct = (req, res, next) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return next(new NotFoundError("Product not found"));
  Object.assign(product, req.body);
  res.json(product);
};

// DELETE /api/products/:id
exports.deleteProduct = (req, res, next) => {
  const index = products.findIndex(p => p.id === Number(req.params.id));
  if (index === -1) return next(new NotFoundError("Product not found"));
  products.splice(index, 1);
  res.json({ message: "Product deleted successfully" });
};

// Search by name
exports.searchProducts = (req, res) => {
  const { name } = req.query;
  const result = products.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
  res.json(result);
};

// Product stats
exports.getProductStats = (req, res) => {
  const stats = {};
  products.forEach(p => (stats[p.category] = (stats[p.category] || 0) + 1));
  res.json(stats);
};
