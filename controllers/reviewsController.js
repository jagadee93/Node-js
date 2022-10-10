const { default: mongoose } = require("mongoose");
const Review = require("../model/Review");
const User = require("../model/User");
const Movie=require("../model/Movies");
const { v4: uuidv4 } = require('uuid');
const { response } = require("express");
; // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const apiGetAllReviewsOfaMovie = async (req,res) => { 
    const movies=await Review.find()
    if (movies.length ===0 ) return res.status(404).json({"message": "NO Movies not found"})
     console.log(movies,"movie");
     return res.json(movies);
}

const apiPostReview = async (req, res)  =>{
    const uniqueId=uuidv4();
    const {movieId,review,rating} = req.body;
    console.log(req.body.username)
    if (!movieId||!rating||!review) return res.status(400).json({ 'message': 'please enter all fields' });
    if (!req.body.username) return res.status(401).json({"message":"login to submit review"})
    const [foundUser]= await User.find({username:req.body.username});
    console.log(foundUser)
    if (!foundUser) return res.status(403)
    if (foundUser?.reviewedMovies?.includes(movieId)) {
       return res.status(409).json({'message': 'you have alreadyreviewed this movie' });
    }
    else{
        console.log('heyy im in else block');
        const result =await User.updateOne(
            {_id:req.body.userId},
            {$addToSet:{reviews:uniqueId}},
        )
        const result2=await User.updateOne(
            {_id:req.body.userId},
            {$addToSet:{reviewedMovies:movieId}},
        );
        console.log(result2);
        console.log(result,"hey updated in user" );
    }

    try{
        const result= await Review.create({
            uniqueId:uniqueId,
            MovieId :movieId,
            review: review, 
            rating: rating,
            userInfo: {
                name: req.body.username,
            },
        })
        console.log(result,"hey created review");
        //working
        const added =await Movie.findOneAndUpdate(
            {_id:req.body.movieId},
            {$addToSet: {reviews:uniqueId}},
        );
        //not working
        const raating= await Movie.updateOne(
             {_id:req.body.movieId},
             {rating:rating}
        )
        console.log(added,"added to movies array");
       return  res.status(201).json({"message": 'review posted'});
    }catch(err){
        console.error(err)
       return res.status(500).json({ 'message': err.message });
    }
    
}
const apiUpdateReview = async(req, res) => {
    const{reviewId,review,userId,}= req.body;
    if (!reviewId||!review||!userId) return res.status(400).json({"message": 'please enter review'})
    const FoundReview = await Review.findOne({_id:reviewId}).exec();
    if (FoundReview.userInfo._id !==userId) return res.status(403).json({"message":"you cannot edit other user reviews"});
    FoundReview.review=review;
    const result= await FoundReview.save();
    res.status(200).json({"message": 'review updated'});
}


const apiDeleteReview = async (req, res) =>{
    const {reviewId,userId}=req.body;
    const FoundReview= await Review.findOne({_id:reviewId}).exec();
    console.log(FoundReview);
    if (!FoundReview){
        return res.status(204).json({"message":"cant find review"})
    }
    if (FoundReview.userInfo._id !==userId) return res.status(403).json({"message":"you are not authorized to delete"})
    const result= await FoundReview.deleteOne();
    console.log(result);
    res.status(204).json({"message":"success"});

}

const getAllReviewsForaMovie = async(req,res) =>{
    console.log(req.params.id);
    const reviews=await Review.find({MovieId:req.params.id}).exec();
    if(!reviews) return res.status(404).json({"message":"no reviews found"});
    return res.status(200).json(reviews);
}

module.exports ={apiPostReview,apiDeleteReview,apiUpdateReview,getAllReviewsForaMovie,apiGetAllReviewsOfaMovie};