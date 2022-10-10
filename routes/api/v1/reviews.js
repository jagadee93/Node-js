const express = require('express');
const router = express.Router();
const  ReviewController = require('../../../controllers/reviewsController')
router.route('/')
    .get(ReviewController.apiGetAllReviewsOfaMovie)
    .post(ReviewController.apiPostReview)
    .put(ReviewController.apiUpdateReview)
    .delete(ReviewController.apiDeleteReview);
router.route('/:id')
    .get(ReviewController.getAllReviewsForaMovie);
module.exports = router;