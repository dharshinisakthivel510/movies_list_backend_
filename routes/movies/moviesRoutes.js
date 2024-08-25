const express = require("express");
const router = express.Router();
const Movies = require ("../../db/schemas/movieSchema")
router.get( "/", async (req,res) =>
    {
        const movies = await Movies.find();
        res.json(movies);
    } );

    router.post("/", async (req,res) => {
        try {//console.log(req.body);
            const moviesData = req.body;
            const newMovie = new Movies(moviesData);
            await newMovie.save();
            res.json({
                message: "Movie added successfully"
            });
        } 
        catch (error){
            console.log(error);
            res.status(500).json({
                message:" Internal server error"
            })
        }
        //const moviesData = req.body;
        //const newMovie= new Movie(moviesData);

    })
   module.exports = router;