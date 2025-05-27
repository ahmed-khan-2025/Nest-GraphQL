const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// Serve static files from "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for root to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
