// import { Request, Response } from "express";

// const express = require('express');
// const app = express();

// // Determine the instance number based on environment variable or command-line argument
// const instanceNumber:any = process.env.INSTANCE_NUMBER || 1;
//   // Define the port for each instance
// const port = 3000 + instanceNumber - 1;
// console.log(instanceNumber, port,"instanceNumber")
// // Route expensive endpoint to specific instances
// if (instanceNumber === 2) {
//     app.get('/expensive', expensiveHandler);
// } else {
//     app.get('/', regularHandler);
// }

// // Expensive operation handler:
// function expensiveHandler(req:Request, res:Response) {
//     // Perform expensive operation asynchronously or using worker threads
//     // ...
//     res.send('Expensive operation completed');
// }

// // Regular request handler
// function regularHandler(req: Request, res: Response) {
//     res.send('Regular request handled');
// }

// // Start the server
// app.listen(port, () => {
//     console.log(`Instance ${instanceNumber} running on port ${port}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Determine the instance number based on environment variable or command-line argument
const instanceNumber = process.env.INSTANCE_NUMBER || 1;

// Define the port for each instance
const port = 8000 + instanceNumber - 1;

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

// Start the server
app.listen(port, () => {
  console.log(`Instance ${instanceNumber} running on port ${port}`);
});