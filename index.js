const express = require("express");
const app = express(); // Create an instance of the Express application
const routing = require('./routes/routes');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT || 4040;



app.use(
  bodyParser.json({
      verify: function(req, res, buf) {
          req.rawBody = buf;
      }
  })
);

app.use('/api',routing);

// Use the body-parser middleware to parse the request body as JSON
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!');
}
);




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
//req.body.rawBody.toString() 