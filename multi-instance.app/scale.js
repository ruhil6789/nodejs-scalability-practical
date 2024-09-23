// Instead of storing state in memory, use external storage
const express = require('express');
const redis = require('redis');
const logger = require("./winston")
const { MongoClient } = require('mongodb');
const NodeCache = require('node-cache');
const myCache = new NodeCache();
const app = express();


const redisClient = redis.createClient(process.env.REDIS_URL);

app.use(express.json());

const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/';

// Database Connection Pooling:
// Use connection pooling for database connections:

// Create a new MongoClient
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Connection pool settings
    maxPoolSize: 20, // Maximum number of connections in the pool
    minPoolSize: 5   // Minimum number of connections in the pool
});

// Database Name
const dbName = 'scale';

// Connect to the MongoDB server
client.connect()
    .then(() => console.log('Connected successfully to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Caching:
// Implement caching to reduce database load:


app.get('/data', async (req, res) => {
    try {
        // Get the database
        const db = client.db(dbName);

        // Get the collection
        const collection = await db.collection('scale');

        // Perform the query
        const result = await collection.find({}).toArray();

        // Send the result
        res.json(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});




app.post('/user', async (req, res) => {
    const { userId, data } = req.body;
    await redisClient.set(`user:${userId}`, JSON.stringify(data));
    res.send('User data stored');
});

app.get('/user/:id', async (req, res) => {
    const userData = await redisClient.get(`user:${req.params.id}`);
    res.json(JSON.parse(userData));
});

app.listen(process.env.PORT || 3000);

// Build your application so that you can add additional application servers easily.
// This often involves being observant about where and how state is maintained,
//     and how traffic is routed. 1


// Load Balancing:
// Use a load balancer like Nginx or HAProxy to distribute traffic across multiple application servers.
// Session Management:
// Use distributed session storage: