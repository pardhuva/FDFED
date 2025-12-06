const express = require("express");
const path = require("path");
const app = express();

// Middleware
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Dummy user data
const users = [
    { username: "paru", accountNumber: 1234, password: "123", balance: 0 },
    { username: "pardhuva", accountNumber: 456, password: "456", balance: 0 },
    { username: "madhuri", accountNumber: 789, password: "789", balance: 0 }
];

// Helper function
function findUser(username, accountNumber, password) {
    return users.find(u =>
        u.username === username &&
        u.accountNumber === accountNumber &&
        u.password === password
    );
}

// Serve login page
app.get('/', (req, res) => {
    res.render('login');
});

// Serve homepage
app.get('/homepage', (req, res) => {
    res.render('homepage'); // It will render views/homepage.ejs
});


// Login
app.post('/login', (req, res) => {
    const { username, accountNumber, password } = req.body;
    const user = findUser(username, accountNumber, password);

    if (user) {
        console.log("Login successful");
        res.json({success:true});
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Balance check
app.post('/balance', (req, res) => {
    const { username, accountNumber, password } = req.body;
    const user = findUser(username, accountNumber, password);

    if (user) {
        res.json({ balance: user.balance });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Deposit
app.post('/deposit', (req, res) => {
    const { username, accountNumber, password, amount } = req.body;
    const user = findUser(username, accountNumber, password);

    if (user) {
        if (typeof amount === "number" && amount > 0) {
            user.balance += amount;
            console.log(`${amount} deposited. New balance: ${user.balance}`);
            res.json({ message: 'Deposit successful', newBalance: user.balance });
        } else {
            res.status(400).json({ message: 'Invalid deposit amount' });
        }
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Withdraw
app.post('/withdraw', (req, res) => {
    const { username, accountNumber, password, amount } = req.body;
    const user = findUser(username, accountNumber, password);

    if (user) {
        if (typeof amount === "number" && amount > 0 && user.balance >= amount) {
            user.balance -= amount;
            console.log(`${amount} withdrawn. New balance: ${user.balance}`);
            res.json({ message: 'Withdraw successful', newBalance: user.balance });
        } else {
            res.status(400).json({ message: 'Insufficient balance or invalid amount' });
        }
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
