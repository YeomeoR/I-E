const express = require('express');
const router = express.Router();

const db = require('../db_connection');

router.post('/submitExpense', (req, res) => {
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

module.exports = router;