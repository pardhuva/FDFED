
const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const path = require('path');
const port = 1000;

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");

//connection to mongodb 
mongoose.connect("mongodb://127.0.0.1:27017/productDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true
   })
    .then(() =>{
        console.log("Connected to MongoDB");
    })
    .catch((err) =>{
        console.log("Error connecting to mongodb",err);
});


const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String
});

//create model
const Product = mongoose.model('Product',productSchema);

//default products 
const seedProducts = [
    { name: 'laptop', price: 50000 ,type:"electronics" },
    { name: 'phone', price: 20000,type:"electronics" },
    { name: 'watch', price: 3000,type:"electronics" }
]

Product.insertMany(seedProducts)
 .then(() => console.log("Sample products inserted"))
 .catch(err => console.log('Error inserting products', err));


app.get('/',(req,res) =>{
    res.render('product');
})

app.get('/product',async(req,res) =>{
    const name = req.query.name;;
    console.log("Request received with:", req.query.name);
    try{
        const product = await Product.findOne({name : name});

        if(product) {
            res.json({ ...product.toObject(), onSale: true});
        }else{
            res.json({});
        }
    }catch (error){
        console.error("Error finding product:", error);
        res.status(500).json({message: "Server error"});
    }
});
app.get("/recommendations", (req, res) => {
    const excludeName = req.query.exclude?.toLowerCase();
    const allProducts = [ ];

    const recommended = allProducts.filter(p => p.type.toLowerCase() === excludeName);
    res.json(recommended);
});

app.listen(port, ()=>{
    console.log(`Server is running on http:localhost:${port}`);
});



