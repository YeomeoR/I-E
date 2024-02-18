const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db_connection.js');

const PORT = process.env.PORT || 3080;

app.use(express.static('public'));
app.use(express.json()); // Add this line to parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/submitExpense', (req, res) => {
  console.log(req.body);
  db.query(`
    CREATE TABLE IF NOT EXISTS expense (
      id INT AUTO_INCREMENT PRIMARY KEY,
      type VARCHAR(255),
      date DATE,
      amount DECIMAL(10, 2),
      description VARCHAR(255),
      car_mileage DECIMAL(10, 2),
      bike_mileage DECIMAL(10, 2)
    )
  `, (err, result) => {
    if (err) throw err;
    console.log('Expense table created or already exists');
  });

  db.query('INSERT INTO expense (type, date, amount, description, car_mileage, bike_mileage) VALUES (?, ?, ?, ?, ?, ?)', [req.body.expenseType, req.body.expenseDate, req.body.expenseAmount, req.body.expenseDescription, req.body.carMileage, req.body.bikeMileage], (err, result) => {
    if (err) throw err;
    console.log('Expense inserted');
  });
  res.redirect('/');

});

app.post('/submitIncome', (req, res) => {
  console.log(req.body);

    db.query(`
      CREATE TABLE IF NOT EXISTS income (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(255),
        date DATE,
        amount DECIMAL(10, 2),
        description VARCHAR(255)
      )
    `, (err, result) => {
      if (err) throw err;
      console.log('Income table created or already exists');
    });

    db.query('INSERT INTO income (type, date, amount, description) VALUES (?, ?, ?, ?)', [req.body.incomeType, req.body.incomeDate, req.body.incomeAmount, req.body.incomeDescription], (err, result) => {
      if (err) throw err;
      console.log('Income inserted');
    });
    res.redirect('/');

});

app.post('/download', (req, res) => {
    console.log(req.body);

    const fromDate = new Date(req.body.fromDate);
    const toDate = new Date(req.body.toDate);


    db.query('SELECT * FROM income WHERE date BETWEEN ? AND ?', [fromDate, toDate], (err, result) => {
      if (err) throw err;
      db.query('SELECT * FROM expense WHERE date BETWEEN ? AND ?', [fromDate, toDate], (err, result2) => {
        if (err) throw err;

        let income = {};
        // let expense = {};
        result.forEach((row) => {
          if (income[row.date]) {
            income[row.date].push(row);
          } else {
            income[row.date] = { income: [row], expenses: [] };
          }
        });
        result2.forEach((row) => {
          if (income[row.date]) {
            income[row.date].expenses.push(row);
          } else {
            income[row.date] = { income: [], expenses: [row] };
          }
        });

        res.json({ income });

        
      });
      

    });
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});