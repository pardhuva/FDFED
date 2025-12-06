
const express = require("express");
const path = require("path");
const app = express();
const PORT = 4000;


app.use(express.static(path.join(__dirname)));

const products = [
  {
    id: 1,
    name: "moneyplant",
    price: 300,
    category: "plants",
    manufacturingDate: "2025-01-15",
    onSale: true
  },
  {
    id: 2,
    name: "chiaseeds",
    price: 200,
    category: "seeds",
    manufacturingDate: "2024-11-10",
    onSale: true
  },
  {
    id: 3,
    name: "cricket bat",
    price: 30,
    category: "Sports",
    manufacturingDate: "2022-02-05",
    onSale: true
  },
  
];

app.get('/' ,(req,res) =>{
    res.render('product');
})

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});