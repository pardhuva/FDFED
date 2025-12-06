const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Default users (for demo)
const users = [
    { name: 'paru', account: '123', password: 'paru123' },
    { name: 'madhu', account: '456', password: 'madhu456' }
];

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/homepage', (req, res) => {
    res.render('homepage');
});


// Login API
app.post('/api/login', (req, res) => {
    const { name, account, password } = req.body;
    const user = users.find(
        u => u.name === name && u.account === account && u.password === password
    );
    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Invalid credentials' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
