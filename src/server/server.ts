const express = require('express');
const mysql = require('mysql'); //mysql driver
const app = express();

const port = 3000;

const connection = mysql.createConnection({
    host: 'make-a-meal.caysbalbgorm.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'hoopla1993',
    database: 'sys',
    port: '3306'
});
connection.connect((err) => {
    if(err) throw err;
    console.log('Database connected!');
})

connection.query('SELECT * FROM full_dataset', function (err, rows, fields) {
    if (err) throw err
    
    console.log('Row 1 is ', rows[0])
  })

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
})