// Configuration-driven development is an approach where the behavior and settings of an application are determined by configuration files or parameters, rather than being hardcoded. This allows for easier customization and flexibility without modifying the codebase.const express = require('express');
const app = express();
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json'));
// Use the port from the configuration
const port = config.port;

// Set up database connection using the configuration
const dbHost = config.database.host;
const dbPort = config.database.port;
const dbName = config.database.name;
// Set up database connection using the configuration values

// Set up API key validation middleware
app.use((req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || !config.apiKeys.includes(apiKey)) {
        return res.status(401).json({ error: 'Invalid API key' });
    }
    next();
});

// Set up logging based on the configured log level
const logLevel = config.logLevel;
// Configure logging based on the logLevel value

// In-memory storage for items (replace with a database in production)
let items = [];

// Middleware
app.use(bodyParser.json());

// Create operation
app.post('/items', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    res.status(201).json(newItem);
});

// Read operation
app.get('/items', (req, res) => {
    res.json(items);
});

// Update operation
app.put('/items/:id', (req, res) => {
    const itemId = req.params.id;
    const updatedItem = req.body;
    const index = items.findIndex(item => item.id === itemId);
    if (index !== -1) {
        items[index] = { ...items[index], ...updatedItem };
        res.json(items[index]);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

// Delete operation
app.delete('/items/:id', (req, res) => {
    const itemId = req.params.id;
    const index = items.findIndex(item => item.id === itemId);
    if (index !== -1) {
        const deletedItem = items.splice(index, 1);
        res.json(deletedItem[0]);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});



// Set up server with maximum connections from the configuration
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
server.maxConnections = config.maxConnections;

// Define routes and other application logic
// ...