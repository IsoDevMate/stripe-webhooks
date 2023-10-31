const express = require("express");
const app = express(); // Create an instance of the Express application
const routing = require('./routes/routes');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT || 4040;


// Use the body-parser middleware to parse the request body as JSON
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
}
);

app.use('/api',routing);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
