const express = require('express');
const router = express.Router();

const db = require('../db_connection');

router.post('/download', (req, res) => {
  console.log(req.body);

  const fromDate = new Date(req.body.fromDate);
  const toDate = new Date(req.body.toDate);

  // res.send('in progress');

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

      // TODO: change to res.render on a route and show a table with the data
      // TODO: add a download button to download the data as a CSV
      
    });
    

  });
});


module.exports = router;