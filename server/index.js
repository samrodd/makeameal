const express = require('express');
const mysql = require('mysql'); //mysql driver
const app = express();
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require("cors");
dotenv.config();

const port = 3001;

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
connection.query('SELECT * FROM full_dataset LIMIT 10', function (err, rows, fields) {
    if (err) throw err
    
    console.log('Rows ', rows)
  })

  /*connection.query('SELECT * FROM ingredient_occurrences', function(err, rows, fields){
    if(err) throw err
    let objectA = {};
    objectA = rows[0];
    console.log(rows);
    //console.log(objectA);
})*/

app.post('/api/post', (req, res) => {
    const ingredientName = req.body.ingredientName;
    
    //console.log(req.body.ingredientName);
    //console.log(req.body);
    
    connection.query("SELECT recipe_id, ingredient_name FROM ingredient_occurrences WHERE ingredient_name = (?) LIMIT 10", ingredientName, function(err, rows, fields){
        if(err) throw err
        res.json(rows);
        console.log(rows);
        /*var id = [];
        for(let i = 0; i < rows.length; i++){
            id.push(rows[i].recipe_id);
            //console.log(id);
        }
        console.log(id.length);*/
    })
    console.log(ingredientName);
    
})

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
})