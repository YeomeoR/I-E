const express = require('express');
const router = express.Router();

const db = require('../db_connection');

router.post('/submitIncome', (req, res) => {
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

module.exports = router;