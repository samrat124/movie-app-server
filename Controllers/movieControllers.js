const movieModel = require('../Models/movieModel')



const getMovies =async()=>{
    const movies = await movieModel.find({});
    return movies;
}

const updateMovieRating=async(increaseRating,movieID,ratings)=>{
    let movie = await movieModel.findOne({_id:movieID});

    let newRating;
    let newPeople;

    if(increaseRating){
        const rating = (movie.averageRating*movie.totalCounting)+ratings;
        newPeople = movie.totalCounting+1;
        newRating = (rating/newPeople).toFixed(1);
    }else{
        const rating = (movie.averageRating*movie.totalCounting)-ratings;
        newPeople = movie.totalCounting-1;
        newRating = (rating/newPeople).toFixed(1);
    }

    const updatedMovie = await movieModel.updateOne({_id:movieID},{averageRating:newRating,totalCounting:newPeople});
    return updatedMovie;
}

module.exports = {getMovies,updateMovieRating}