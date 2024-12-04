
const express = require('express')
const router = express.Router({mergeParams:true});
const catchAsync=require('../utils/catchAsync')
const ExpressError=require('../utils/expressError')
const Review=require('../models/review')
const Campground=require('../models/campground')
const {reviewSchema}=require('../valSchemas')


// VALIDATIONS Middleware


const validateReview = (req, res, next)=>{
    const {error} = reviewSchema.validate(req.body);  // imported
    if(error){
        const msg = error.details.map(el => el.message).join(',') // for each element in details arr, return the message in it. Join multiple messages with ,
        throw new ExpressError(msg, 400)
    }
    else{
        next();
    }
}
// REVIEWS
router.post('/', validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review({...req.body.review})
    campground.reviews.push(review)
    await campground.save()
    await review.save()
    req.flash('success', 'Successfully created review!')
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:reviewID', catchAsync(async (req, res) => {
    const {id, reviewID}=req.params;
    await Campground.findByIdAndUpdate(id, {$pull:{reviews: reviewID}})
    await Review.findByIdAndDelete(reviewID)
    req.flash('success', 'Successfully deleted review!')
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router;