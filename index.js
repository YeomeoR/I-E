const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db_connection.js');
const incomeRouter = require('./routes/income.js');
const expenseRouter = require('./routes/expense.js');
const downloadsRouter = require('./routes/download.js');
// const downloadTableRouter = require('./routes/downloadTable.js');

const PORT = process.env.PORT || 3080;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* MIDDLEWARE */
app.use(express.static('public'));
app.use(express.json()); // Add this line to parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* MIDDLEWARE ROUTES */
app.use('/', incomeRouter);
app.use('/', expenseRouter);
app.use('/', downloadsRouter);
// app.use('/', downloadTableRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});