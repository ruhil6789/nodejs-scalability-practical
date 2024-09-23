const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

// Set up session middleware
app.use(cookieParser());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
}));

// Example route to demonstrate session usage
app.get('/login', (req, res) => {
    if (req.session.isLoggedIn) {
        res.send('You are already logged in.');
    } else {
        req.session.isLoggedIn = true;
        req.session.username = 'exampleUser';
        res.send('You have been logged in.');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.send('You have been logged out.');
    });
});

app.get('/protected', (req, res) => {
    if (req.session.isLoggedIn) {
        res.send(`Welcome, ${req.session.username}`);
    } else {
        res.status(401).send('You must be logged in to access this page.');
    }
});


const sessionFilter = (req, res, next) => {
    if (req.session && req.session.isLoggedIn) {
        next();
    } else {
        res.status(401).send('You must be logged in to access this page.');
    }
};

// Apply the session filter to protected routes
app.get('/protected', sessionFilter, (req, res) => {
    res.send(`Welcome, ${req.session.username}`);
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



