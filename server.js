const path = require('path');
const express = require('express');

const app = express();
const DIST_DIR = path.join(__dirname, 'dist');
app.use(express.static(DIST_DIR));
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.get('*', (req, res) => {
  res.sendFile(HTML_FILE);
}); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

});
