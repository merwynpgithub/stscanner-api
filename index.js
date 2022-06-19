const express = require('express');

const PORT = process.env.PORT || 9000;

const app = express();
const helmet = require("helmet");
const cors = require("cors");

app.use(cors());
app.use(helmet());

const ticker = require('./ticker');
app.use('/ticker', ticker);


app.get('/', (req, res) => {
  res.send("works");
});
app.get('/title', (req, res) => {
  res.json({"title": "Stock Scanner"});
});

app.listen(PORT, () => {
  console.log("Listening on port 9000");
});




