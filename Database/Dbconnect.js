
const env=require('dotenv')
const mongoose=require('mongoose');

const connect=async()=>{
const result=mongoose.connect(process.env.DB_CONNECTION_URL);
return result;
}


module.exports=connect;