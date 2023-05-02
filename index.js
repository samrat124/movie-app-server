const express = require('express');
const connect = require('./Database/Dbconnect');
const cors = require('cors');
const movieRouter = require('./Routers/movieRoutes');
const userRouter = require('./Routers/userRoutes');

require('dotenv').config();
const env = require('dotenv');


const app = express();

app.use(cors());
app.use(express.json());
app.use('/movies',movieRouter);
app.use('/users',userRouter);

app.use('/',(req,res)=>{
    res.send('Done');x
})


connect().then(res=>{
    app.listen(process.env.PORT, () => {
        console.log('Server Started');
    })
    
}).catch(err=>{
    console.log(err);
})