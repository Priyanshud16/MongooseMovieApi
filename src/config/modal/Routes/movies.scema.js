const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
    title: {type:String,required:true},
    poster: String
},{versionKey:false});

const MoviesModel = model('Movie', movieSchema); // Changed 'Modal' to 'model' and corrected the typo in 'MoviesModel'

module.exports = MoviesModel; // Corrected the export name to match the variable name
