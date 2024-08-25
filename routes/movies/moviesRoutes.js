const express = require("express");
const router = express.Router();
const Movies = require("../../db/schemas/movieSchema");

// Get all movies
router.get("/", async (req, res) => {
   try {
     const queryParams = req.query;
     const filters = {};
     if (queryParams.name) {
        filters.name = {
            $regex: '$(queryParams.name) ',
            $options:"i",

        };

     }
     if  (queryParams.rating){
        filters.rating = {
            $gte: parseFloat(queryParams.rating),
        };
     }
        const movies = await Movies.find(filters);
        res.json(movies);
   } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
   }
});

// Add a new movie
router.post("/", async (req, res) => {
    try {
        const moviesData = req.body;
        const newMovie = new Movies(moviesData);
        await newMovie.save();
        res.json({
            message: "Movie added successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Update a movie by ID
router.put("/:id", async (req, res) => {
    try {
        const movieId = req.params.id;
        const updateMovieData = req.body;
        
        await Movies.findByIdAndUpdate(movieId, updateMovieData);
        res.json({
            message: "Movie updated successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});
//delete a movie by ID

router.delete("/:id", async (req, res) => {
    try {
        const movieId = req.params.id;
       //const updateMovieData = req.body;
        
        await Movies.findByIdAndDelete(movieId);
        res.json({
            message: "Movie deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.get("/:id", async (req,res)=>{
    try{
        const movieId = req.params.id;
        const MovieData = req.body;
        const find = await Movie.findById(movieId,MovieData);
        res.json({
            message:"Movie Found Successfully",
        })
    }
    catch(error){
        if(error.kind === "ObjectId"){
            return res.status(404).json({message: "Movie Not Found"});
        }
        else{
            return res.status(500).json({message: "Internal Server Error"});
        }

        // console.log(error);
        // res.status(404).json({
        //     message:"Movie not found",
        // });
    }
})

module.exports = router;