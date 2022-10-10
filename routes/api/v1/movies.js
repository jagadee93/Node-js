const express = require('express');
const router = express.Router();
const  movieController = require('../../../controllers/movieController')
router.route('/')
    .get(movieController.apiGetMovies)
    .post(movieController.apiAddNewMovie)
    .put(movieController.apiUpdateMovie)
    .delete(movieController.apiDeleteMovie)
router.route('/:id')
    .get(movieController.apiGetOneMovie)
module.exports = router;
