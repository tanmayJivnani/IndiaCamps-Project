const express = require('express')
const router = express.Router({mergeParams:true});
const catchAsync=require('../utils/catchAsync')
const reviews=require('../controllers/reviews')
const Review=require('../models/review')
const Campground=require('../models/campground')
const {validateReview, isLoggedIn, isReviewAuthor}=require('../middleware')


// REVIEWS
router.post('/', isLoggedIn, validateReview, reviews.createReview)

router.delete('/:reviewID', isLoggedIn, isReviewAuthor, reviews.deleteReview)

module.exports = router;