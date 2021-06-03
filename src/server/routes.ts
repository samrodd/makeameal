import * as express from 'express';
import DB from './db';

const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    res.json('World');
});

router.get('/api/ingredients', async(req, res) => {
    try{
        let ingredients = await DB.Ingredients.all();
        res.json(ingredients);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }

})

export default router;