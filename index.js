const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db_connection.js');
const incomeRouter = require('./routes/income.js');
const expenseRouter = require('./routes/expense.js');
const downloadsRouter = require('./routes/download.js');

const PORT = process.env.PORT || 3080;

/* MIDDLEWARE */
app.use(express.static('public'));
app.use(express.json()); // Add this line to parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* MIDDLEWARE ROUTES */
app.use('/', incomeRouter);
app.use('/', expenseRouter);
app.use('/', downloadsRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});