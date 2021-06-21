const express = require('express');
const mysql = require('mysql'); //mysql driver
const app = express();
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require("cors");
dotenv.config();

const port = 3002;

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
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.post('/api/post', (req, res) => {
    const ingredientName = req.body.ingredientName;
    //console.log(req.body.ingredientName);
    //console.log(req.body);
    let matched_id = [];
    connection.query("SELECT id, ingredient_name FROM ingredient_occurrences WHERE ingredient_name = (?)", ingredientName, function(err, rows, fields){
        if(err) throw err
        console.log(rows);
    })
    console.log(ingredientName);
})
app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
})