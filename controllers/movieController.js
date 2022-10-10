const { json } = require("express");
const Movies = require("../model/Movies");
const Review = require("../model/Review");
const User = require("../model/User");
const apiGetMovies = async (req, res) => {
    const moviesPerPage=req?.query?.moviesPerPage?parseInt(req.query.moviesPerPage):12
    const page=req?.query?.page?(parseInt(req.query.page-1)*moviesPerPage):0;
    console.log(page)
    const movies = await Movies.find().where({approvedStatus:true}).skip(page).limit(moviesPerPage).exec();
    if (!movies) return res.status(204).json({ 'message': 'No movies found.' });
    res.json(movies);
}
const apiAddNewMovie = async (req, res) => {
    console.log(req.body)
    if (!req?.body?.title || !req?.body?.year ||!req?.body?.language ||!req?.body?.genres) {
        return res.status(400).json({ 'message': 'Movie title and year of release and language are required' });
    }
    const result = await Movies.findOne({ title:req.body.title })
    console.log(result)
    if (result) {
    // movie exists...
    return res.status(403).json({ 'message':"movie already exists" });
    }
    try {
        const result = await Movies.create({
            title:req.body.title,
            year:req.body.year,
            approvedStatus:req.body.role>=3000? true:false,
            language:req.body.language,
            genres:[req.body.genres],
            poster: req.body.poster,
            plot: req.body.plot,
            cast:[req.body.cast],
            runtime: req.body.runtime,
            bgPoster: req.body.bgPoster,
            addedBy:{
                username:req.body.username,
                _id:req.body.id
            }
            
        });
        console.log(result);
        
        const update =await User.updateOne(
            { username:req.body.username}, 
            { $push: { addedMovies: req.body.title } },
        );
        console.log(update,"updated");
        console.log(update)

        res.status(201).json(result); 
    } catch (err) {
        console.error(err);
    }
    

}
const apiDeleteMovie =async() =>{
    if (!req.body.movieid)  return res.status(403).json({"message":"provide movie id"})
    await Movies.findByIdAndDelete({_id:movieid})
    return res.status(200)
}
const apiUpdateMovie =async(req,res) =>{
    const {movieId,code} =req.body;
    console.log(movieId)
    console.log(code)
    if (!movieId||!code) return res.status(409)
    const movieDetails=await Movies.findOne({_id:movieId})
    console.log(movieDetails)
    movieDetails.approvedStatus= code ? true : false;
    movieDetails.poster=req?.body?.poster
    const result =await movieDetails.save();
    console.log(result)
    return res.status(409).json({"message":"updated"})


}
const apiGetPendingMovies= async(req,res) =>{
    console.log("im in admin page")
    const movies = await Movies.find().where({approvedStatus:false}).exec();
    if (!movies) return res.status(204).json({"message" :"no movies found"})
    return res.json(movies)

}

const apiGetOneMovie = async(req,res) =>{
    console.log(req.params.id,"id");
    // if (((req.params.id).length<24)) return res.status(400).json({"message":"invalid id"})
    const movieDetails = await Movies.find({_id:req.params.id}).exec();
    if (!movieDetails) return res.status(400).json({"message":"notfound"})
    return res.json(movieDetails);
}
module.exports = {apiGetMovies,apiAddNewMovie,apiGetOneMovie,apiUpdateMovie,apiGetPendingMovies,apiDeleteMovie};