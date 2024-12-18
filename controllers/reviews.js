const catchAsync=require('../utils/catchAsync')
const Review=require('../models/review')
const Campground=require('../models/campground')

module.exports.createReview = catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review({...req.body.review})
    review.author = req.user._id;
    campground.reviews.push(review)
    await campground.save()
    await review.save()
    req.flash('success', 'Successfully created review!')
    res.redirect(`/campgrounds/${campground._id}`)
})

module,exports.deleteReview = catchAsync(async (req, res) => {
    const {id, reviewID}=req.params;
    await Campground.findByIdAndUpdate(id, {$pull:{reviews: reviewID}})
    await Review.findByIdAndDelete(reviewID)
    req.flash('success', 'Successfully deleted review!')
    res.redirect(`/campgrounds/${id}`)
})