const express = require('express');
const mysql = require('mysql'); //mysql driver
const app = express();
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require("cors");
const { json, response } = require('express');
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

 connection.query('SELECT * FROM full_dataset WHERE ingredient_count = 3 ', function (err, rows, fields) {
     if (err) throw err
    
     console.log('Rows ', rows)
   })

//   connection.query('SELECT * FROM ingredients', function(err, rows, fields){
//     if(err) throw err
    
//     console.log(rows);
   
// })

//var matched_id = [];
app.post('/api/post', (req, res) => {
    console.log('post')
    var matched_id = [];
    const ingredientName = req.body.ingredientName;
    console.log(ingredientName)
    let strArr = ingredientName.split(', ');
    console.log(strArr);

    //const strArr = req.body.ingredientName;
    
    
    
    let new_procedure = `CALL sys.new_procedure('${strArr[0]}', '${strArr[1]}', '${strArr[2]}', '${strArr[3]}', '${strArr[4]}', '${strArr[5]}', '${strArr[6]}', '${strArr[7]}')`;
    console.log(new_procedure);
    
    connection.query(new_procedure, true, function(err, rows, fields){
        if(err) throw err;
        
        console.log(rows[0])
        
        res.send(rows[0])
        //if(rows[0].length != 0){ res.send(rows[0]) }
        //else { res.send("no result found")}
        
        /*for(let value of Object.values(rows[0]))
        {
            //console.log(value.id);
            matched_id.push(value.id);
        }
        console.log("post matched id is " + matched_id)
        //console.log(Object.entries(rows[0][0].id));
        //console.log(Object.values(JSON.parse(JSON.stringify(rows[0][0]))));
        /*let result = Object.values(JSON.parse(JSON.stringify(rows)))
        //console.log(result[0][0]);
        if(typeof result[0][0] !== 'undefined')
        {
            
            console.log("matched id is ...." + Object.values(JSON.parse(JSON.stringify(result[0][0]))));
            matched_id.push(result[0][0].id);
        }
        */
        
    })
})
/*
app.get('/api/get', (req, res, next) => {
    
    console.log('get matched_id is ' + matched_id)
    let get_recipes_query = "SELECT id, title, ingredients, directions, ingredients_string FROM full_dataset LIMIT 1000";
    //let get_recipes_query = "SELECT id, title, ingredients, directions, ingredients_string FROM full_dataset WHERE id = ?"
    let all_recipes = [];
    let matched_recipes = [];
    connection.query(get_recipes_query, function(err, rows){
        if(err) throw err
        let resultRows = Object.values(JSON.parse(JSON.stringify(rows)))
        //res.json(rows);
        for(let i = 0; i < resultRows.length; i++){
            //all_recipes.push(resultRows[i]);]
            for(let j = 0; j < matched_id.length; j++){
                if(resultRows[i].id == matched_id[j]){
                    matched_recipes.push(resultRows[i]);
                    break;
                }
            }
            //if(resultRows[i].id == matched_id){ matched_recipes.push(resultRows[i]);}
        }
        res.send(matched_recipes);
        resultRows = [];
        matched_id = [];
        next();
    })
    
   
})*/

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
})