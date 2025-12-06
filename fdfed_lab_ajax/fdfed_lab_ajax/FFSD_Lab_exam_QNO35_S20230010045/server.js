const express = require('express');
const fs = require('fs').promises; // For async file operations
const xml2js = require('xml2js'); // For XML parsing and building
const path = require('path');
const app = express();
const port = 3000;

// XML file path (in project root)
const xmlFilePath = path.join(__dirname, 'surveys.xml');

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

    // Backend validation (unchanged)
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
        S0045Timestamp: new Date().toISOString() // Store as ISO string
    };

    try {
        // Read existing XML or start with empty <surveys>
        let xmlContent;
        try {
            xmlContent = await fs.readFile(xmlFilePath, 'utf8');
        } catch (err) {
            if (err.code === 'ENOENT') {
                xmlContent = '<surveys></surveys>'; // Create empty XML if file doesn't exist
            } else {
                throw err;
            }
        }

        // Parse XML to JS object
        const parser = new xml2js.Parser({ explicitArray: false });
        const parsedXml = await parser.parseStringPromise(xmlContent);

        // Ensure surveys structure exists
        let surveys = parsedXml.surveys || {};
        if (!surveys.survey) {
            surveys.survey = [];
        } else if (!Array.isArray(surveys.survey)) {
            surveys.survey = [surveys.survey];
        }

        // Append new survey
        surveys.survey.push(surveyData);

        // Build new XML from JS object
        const builder = new xml2js.Builder();
        const newXml = builder.buildObject({ surveys });

        // Write to file
        await fs.writeFile(xmlFilePath, newXml);

        // Detect AJAX request
        const isAjax = req.xhr || req.headers.accept.indexOf('json') > -1;
        if (isAjax) {
            res.status(200).json({ success: true });
        } else {
            res.redirect('/display');
        }
    } catch (err) {
        console.error('Error saving data to XML:', err);
        res.status(500).send('Error saving data');
    }
});


app.get('/display', async (req, res) => {
    try {
        // Read XML
        let xmlContent;
        try {
            xmlContent = await fs.readFile(xmlFilePath, 'utf8');
        } catch (err) {
            if (err.code === 'ENOENT') {
                return res.render('display', { surveys: [] }); // No data if file doesn't exist
            } else {
                throw err;
            }
        }

        // Parse XML to JS object
        const parser = new xml2js.Parser({ explicitArray: false });
        const parsedXml = await parser.parseStringPromise(xmlContent);

        // Extract surveys
        let surveys = parsedXml.surveys.survey || [];
        if (!Array.isArray(surveys)) {
            surveys = [surveys];
        }

        // Convert timestamp strings to Date objects (for sorting and display)
        surveys = surveys.map(survey => ({
            ...survey,
            S0045Timestamp: new Date(survey.S0045Timestamp),
            S0045Rating: parseInt(survey.S0045Rating) // Ensure rating is number
        }));

        // Sort by timestamp descending
        surveys.sort((a, b) => b.S0045Timestamp - a.S0045Timestamp);

        res.render('display', { surveys });
    } catch (err) {
        console.error('Error retrieving data from XML:', err);
        res.status(500).send('Error retrieving data');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});