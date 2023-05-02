const {Router} = require('express');
const { getMovies } = require('../Controllers/movieControllers');


const movieRouter = Router();

movieRouter.get('/',async(req,res)=>{

    try{
        const movies = await getMovies();
        res.send({
            data:movies
        })
    }catch(err){
        res.status(500).send({
            err:'Someting Got Wrong'
        })
    }
    
})


module.exports = movieRouter;
