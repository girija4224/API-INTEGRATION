const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let items = [];

// Get items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Add item
app.post('/api/items', (req, res) => {
  const newItem = req.body.name;
  if (newItem) {
    items.push(newItem);
    res.status(201).json({ message: 'Item added' });
  } else {
    res.status(400).json({ message: 'Name is required' });
  }
});

// Delete item
app.delete('/api/items/:name', (req, res) => {
  const name = req.params.name;
  items = items.filter(item => item !== name);
  res.json({ message: 'Item deleted' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
