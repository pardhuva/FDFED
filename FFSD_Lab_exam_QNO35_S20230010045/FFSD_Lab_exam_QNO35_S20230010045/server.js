const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();
const port = 5000;

// MongoDB connection
const url = 'mongodb://localhost:27017';
const dbName = 'surveyDB';
let db;

MongoClient.connect(url)
    .then(client => {
        db = client.db(dbName);
        console.log('Connected to MongoDB');
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('form');
});

app.post('/submit', async (req, res) => {
    const { S0045FName, S0045LName, S0045Email, S0045Feedback, S0045Rating } = req.body;

    // Backend validation
    if (!S0045FName || S0045FName.length > 50) {
        return res.status(400).send('First name is required and should be less than 50 characters');
    }
    if (!S0045LName || S0045LName.length > 50) {
        return res.status(400).send('Last name is required and should be less than 50 characters');
    }
    if (!S0045Email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(S0045Email)) {
        return res.status(400).send('Valid email is required');
    }
    if (!S0045Feedback || S0045Feedback.length > 500) {
        return res.status(400).send('Feedback is required and should be less than 500 characters');
    }
    if (!S0045Rating || isNaN(S0045Rating) || S0045Rating < 1 || S0045Rating > 5) {
        return res.status(400).send('Rating must be a number between 1 and 5');
    }

    const surveyData = {
        S0045FName,
        S0045LName,
        S0045Email,
        S0045Feedback,
        S0045Rating: parseInt(S0045Rating),
        S0045Timestamp: new Date()
    };

    try {
        await db.collection('S20230010045').insertOne(surveyData);
        res.redirect('/?submitted=true');
    } catch (err) {
        res.status(500).send('Error saving data');
    }
});

app.get('/display', async (req, res) => {
    try {
        const surveys = await db.collection('S20230010045')
            .find()
            .sort({ S0045Timestamp: -1 })
            .toArray();
        res.render('display', { surveys });
    } catch (err) {
        res.status(500).send('Error retrieving data');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});