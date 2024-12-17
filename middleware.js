const ExpressError=require('./utils/expressError')
const {campValSchema, reviewSchema}=require('./valSchemas')
const Campground = require('./models/campground');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!')
        return res.redirect('/login');
    }
    next();
}

module.exports.storeReturnTo = (req, res, next)=>{
    if(req.session.returnTo){
        res.locals.returnTo = req.session.returnTo;
    }
    next()
}

module.exports.validateCampground = (req, res, next)=>{
    // if(!req.body.campground) throw new ExpressError('Invalid Campground Data!', 400) Manual Error Handling -> Tedious
    // Data Validation using Joi -> Easy  
    const {error} = campValSchema.validate(req.body);  // imported
    if(error){
        const msg = error.details.map(el => el.message).join(',') // for each element in details arr, return the message in it. Join multiple messages with ,
        throw new ExpressError(msg, 400)
    }
    else{
        next();
    }
}

module.exports.isAuthor = async (req, res, next)=>{
    const {id}=req.params;
    const campground = await Campground.findById(id);
    if(!campground.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
 }

 module.exports.isReviewAuthor = async (req, res, next)=>{
    const {id, reviewID}=req.params;
    const review = await Review.findById(reviewID);
    if(!review.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
 }

 module.exports.validateReview = (req, res, next)=>{
     const {error} = reviewSchema.validate(req.body);  // imported
     if(error){
         const msg = error.details.map(el => el.message).join(',') // for each element in details arr, return the message in it. Join multiple messages with ,
         throw new ExpressError(msg, 400)
     }
     else{
         next();
     }
 }