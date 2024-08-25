
require("dotenv").config();
const moviesRoutes= require ("./routes/movies/moviesRoutes"); 
const database = require ("./db/index.js");
const express = require("express");

const app = new express();
const port = process.env.PORT || 8080;
// app.use("/ticket",ticketRoutes);
database();
app.use(express.json());
app.use("/movies",moviesRoutes);
app.listen(port, () =>
     {
  console.log(`Express app listening at http://localhost:${port}`);
});