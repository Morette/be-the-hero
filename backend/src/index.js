const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

const port = 3333;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port);

console.log(`server start at port ${port}`);
