const express = require('express');
const mysql = require('mysql'); //mysql driver
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const port = 3000;

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
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