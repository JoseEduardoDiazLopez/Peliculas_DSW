const mongoose = require('mongoose');

let movieSchema = new mongoose.Schema({
    id: {type: Number},
    nombre: {type: String},
    director: {type: String},
    año: {type: Number},
    duración: {type: Number},
    género: {type: String},
});

module.exports = mongoose.model('Movie', movieSchema, 'movie');
