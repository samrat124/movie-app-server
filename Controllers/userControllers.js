const userModel = require('../Models/userModel');
const { updateMovieRating } = require('./movieControllers');

const registerUser =async({name,email,password})=>{

    //Checking User Already Exist Or Not
    const foundUser = await userModel.findOne({email:email});
    if(foundUser){
        throw new Error('Already Registered');
    }

    //Creating New User
    const newUser = await userModel.create({name,email,password});
    return newUser

}


const loginUser =async({email,password})=>{

    //Checking User Exist Or Not
    const foundUser = await userModel.findOne({email:email});
    if(!foundUser){
        throw new Error('User Not Found');
    }

    if(foundUser.password!=password){
        throw new Error('Wrong Password');
    }

    return foundUser

}

const addRating =async({movieId,ratings},userId)=>{

    //Checking User Exist Or Not
    const foundUser = await userModel.findOne({_id:userId});
    if(!foundUser){
        throw new Error('User Not Found');
    }

    const RatedMoviesList = foundUser.RatedMoviesList || [];
    let foundIndex;
    RatedMoviesList.forEach((ele,idx)=>{
        if(ele.movieID==movieId){
            foundIndex=idx;
            return;
        }
    })

    if(foundIndex){
        throw new Error('Already Rated Movie');
    }

    RatedMoviesList.push({movieId,ratings});
    const updatedUser = await userModel.findOneAndUpdate({_id:userId},{RatedMoviesList});
    await updateMovieRating(true,movieId,ratings);
    return updatedUser

}

const deleteRating =async({movieId},userId)=>{

    //Checking User Exist Or Not
    const foundUser = await userModel.findOne({_id:userId});
    if(!foundUser){
        throw new Error('User Not Found');
    }

    const RatedMoviesList = foundUser.RatedMoviesList|| [];
    let foundIndex;
    
    for(let i=0;i<RatedMoviesList.length;i++){
        if(RatedMoviesList[i].movieId==movieId){
            foundIndex=i;
            break;
        }
    }


    if(foundIndex==undefined){
        throw new Error('Movie Not Found');
    }

    await updateMovieRating(false,movieId,RatedMoviesList[foundIndex].ratings);
    RatedMoviesList.splice(foundIndex,1);
    // console.log(ratedMovies)
    const updatedUser = await userModel.findOneAndUpdate({_id:userId},{RatedMoviesList});
    return updatedUser;

}

module.exports = {registerUser,loginUser,addRating,deleteRating};