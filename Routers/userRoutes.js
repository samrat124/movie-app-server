const {Router} = require('express');
const { registerUser, loginUser, addRating, deleteRating } = require('../Controllers/userControllers');



const userRouter = Router();

userRouter.post('/signup',async(req,res)=>{

    try{
        const body = req.body;
        const user = await registerUser(body);
        res.send({
            data:user
        })
    }catch(err){
        res.status(500).send({
            err:err.message
        })
    }

})


userRouter.post('/login',async(req,res)=>{

    try{
        const body = req.body;
        const user = await loginUser(body);
        res.send({
            data:user
        })
    }catch(err){
        res.status(500).send({
            err:err.message
        })
    }

})

userRouter.post('/ratings/:id',async(req,res)=>{

    try{
        const body = req.body;
        const userId = req.params.id
        const user = await addRating(body,userId);
        res.send({
            data:user
        })
    }catch(err){

        res.status(500).send({
            err:err.message
        })
    }

})
userRouter.delete('/ratings/:id',async(req,res)=>{

    try{
        const body = req.body;
        const userId = req.params.id
        const user = await deleteRating(body,userId);
        res.send({
            data:user
        })
    }catch(err){
        
        res.status(500).send({
            err:err.message
        })
    }

})




module.exports = userRouter;