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

connection.query('SELECT * FROM full_dataset WHERE ingredient_count < 4 LIMIT 10', function (err, rows, fields) {
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

var matched_id = [];
app.post('/api/post', (req, res) => {
    //var matched_id = [];
    const ingredientName = req.body.ingredientName;
    console.log(ingredientName)
    let strArr = ingredientName.split(', ');
    console.log(strArr);
    
    //console.log(req.body.ingredientName);
    //console.log(req.body);
    /*
    let newStr = "";
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
    //let resultQuery = `SELECT id, ingredients_string FROM full_dataset WHERE ingredients_string LIKE '${newStr}' LIMIT 10`;
    let resultQuery = `SELECT id, ingredients_string FROM full_dataset WHERE ingredients_string LIKE ${newStr} LIMIT 10`;
    
    connection.query(resultQuery, function(err, rows, fields){
        console.log(resultQuery);
        if(err) throw err
        //res.json(rows);
        //console.log(rows);
        
        for(let i = 0; i < rows.length; i++){
            matched_id.push(rows[i].id);
            //console.log(id);
        }
        console.log(matched_id);
        //matched_id = [];
    })
    */
    
    let new_procedure = `CALL sys.new_procedure('${strArr[0]}', '${strArr[1]}', '${strArr[2]}')`;
    console.log(new_procedure);
    
    connection.query(new_procedure, true, function(err, rows, fields){
        if(err) throw err;

        let result = Object.values(JSON.parse(JSON.stringify(rows)))
        console.log(result[0][0]);
        if(typeof result[0][0] !== 'undefined')
        {
            matched_id.push(result[0][0].id);
        }
        
    })
})

app.get('/api/get', (req, res, next) => {
    
    let get_recipes_query = "SELECT id, title, ingredients, directions, ingredients_string FROM full_dataset LIMIT 10000";
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
                }
            }
            //if(resultRows[i].id == 0){ console.log(matched_id)}
        }
        res.send(matched_recipes);
        resultRows = [];
        matched_id = [];
        next();
    })
    
    /*const updatePromises = []
    for(let i = 0; i < matched_id.length; i++){
        connection.query(get_recipes_query, matched_id[i], function(err, rows){
            if(err) throw err;
            //console.log(rows);
            updatePromises.push(rows);
            
        });
    }*/
    //async.forEachOF()
    //await Promise.all(updatePromises);
    /*getRecipes(matched_id).then(function(result){
        console.log(result);
    })*/
})

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
})