const express = require('express');
const mysql = require('mysql'); //mysql driver
const app = express();
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require("cors");

//const getRecipes = require("./getMatched_recipes");
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

 connection.query('SELECT * FROM full_dataset WHERE ingredient_count = 30 ', function (err, rows, fields) {
     if (err) throw err
    
     console.log('Rows ', rows)
   })

//   connection.query('SELECT * FROM ingredients', function(err, rows, fields){
//     if(err) throw err
    
//     console.log(rows);
   
// })

//var matched_id = [];
app.post('/api/post', (req, res) => {
    //console.log(req.body.inputIngredients)
    
    const strArr = req.body.inputIngredients;
    console.log(strArr)
    if(strArr.length !== 0){
    let newStr ="";
    for(let i = 0; i < strArr.length; i++){
        if(i != strArr.length - 1){
            let temp = "'%" + strArr[i]+ "%'" + " AND ingredients_string LIKE ";
            newStr += temp;
        }
        else{
            let temp = "'%" + strArr[i]+ "%'";
            newStr += temp;
        }
    }
    console.log(newStr);
    const resultQuery = `SELECT * FROM full_dataset WHERE ingredients_string LIKE ${newStr} ORDER BY ingredient_count LIMIT 20`;
    console.log(resultQuery)
    connection.query(resultQuery, function(err, rows){
        if(err) throw err
        console.log(rows)
        res.send(JSON.stringify(rows))
    })
    }

    // const ingredientName = req.body.ingredientName;
    // console.log(ingredientName)
    // let strArr = ingredientName.split(', ');
    // console.log(strArr);

    //let new_procedure = `CALL sys.new_procedure('${req.body.firstIngredient}', '${req.body.secondIngredient}', '${req.body.thirdIngredient}', '${req.body.fourthIngredient}', '${req.body.fifthIngredient}', '${req.body.sixthIngredient}', '${req.body.seventhIngredient}', '${req.body.eighthIngredient}')`;
    
    
    // connection.query(new_procedure, true, function(err, rows, fields){
    //     if(err) throw err;
        
    //     console.log(JSON.stringify(rows[0]))
        
    //     res.send(JSON.stringify(rows[0]))
            
    // })
    
    
})


app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
})