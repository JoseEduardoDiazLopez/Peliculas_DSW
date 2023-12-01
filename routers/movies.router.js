const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies.controller');
const authMiddleware = require('../utils/auth.middleware');
// peliculas
router.get('/', moviesController.getMovies);//sirve

router.get('/:movieId', moviesController.getMovieById);

router.post('/', authMiddleware.authenticateToken, moviesController.newMovie);

router.put('/:movieId', authMiddleware.authenticateToken, moviesController.updateMovie);

router.delete('/:movieId', authMiddleware.authenticateToken, moviesController.deleteMovie);

module.exports = router;


