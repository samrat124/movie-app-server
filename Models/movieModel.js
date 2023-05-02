const mongoose=require('mongoose');

const movieSchema=new mongoose.Schema({
    title:{type:String,required:true},
    releaseYear:{type:String,required:true},
    averageRating:{type:Number,required:true},
    totalCounting:{type:Number,required:true},
    image:{type:String,required:true}
})

const movieModel=mongoose.model('movie',movieSchema);

module.exports=movieModel;