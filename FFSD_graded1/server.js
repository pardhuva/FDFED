const express = require('express');
const app = express();
const path = require('path');
const port = 1000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// In-memory product data
const products = [
  { name: 'laptop', price: 50000, type: 'electronics', addedDate: new Date().toISOString() },
  { name: 'phone', price: 20000, type: 'electronics', addedDate: new Date().toISOString() },
  { name: 'watch', price: 3000, type: 'accessory', addedDate: new Date().toISOString() },
  { name: 'chiaseeds', price: 200, type: 'seeds', addedDate: new Date().toISOString() }
];

// Route to render main page
app.get('/', (req, res) => {
  res.render('product');
});

// Route to fetch all products
app.get('/api/products', (req, res) => {
  console.log("Sending all products...");
  const productsWithSale = products.map(p => ({ ...p, onSale: true }));
  res.json(productsWithSale);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
