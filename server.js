const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve src directory for TypeScript files
app.use('/src', express.static(path.join(__dirname, 'src'), {
  setHeaders: (res, filePath) => {
    if (path.extname(filePath) === '.tsx' || path.extname(filePath) === '.ts') {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
