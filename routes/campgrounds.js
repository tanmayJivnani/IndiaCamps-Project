
const express = require('express')
const router = express.Router();
const catchAsync=require('../utils/catchAsync')
const ExpressError=require('../utils/expressError')
const Campground=require('../models/campground')
const {campValSchema}=require('../valSchemas')
const flash = require('connect-flash')
const {isLoggedIn} = require('../middleware');

// VALIDATIONS Middleware
const validateCampground = (req, res, next)=>{
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

router.get('/', async (req,res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds});
})
// New Form
router.get('/new', isLoggedIn, (req,res) => {
    res.render('campgrounds/new');
})

// POST req handler
router.post('/', isLoggedIn, validateCampground, catchAsync(async (req,res, next) => {  // calling middleware func
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save()
    req.flash('success', 'Successfully made a new campground!')
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.get('/:id', catchAsync(async (req,res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews').populate('author');
    if(!campground){
        req.flash('error', 'Campground not found!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', {campground});
}))
// EDIT form
router.get('/:id/edit', isLoggedIn, catchAsync(async (req,res) => {
    const campground = await Campground.findById(req.params.id);
    if(!campground){
        req.flash('error', 'Campground not found!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', {campground});
}))
// Making Change
router.put('/:id', isLoggedIn, validateCampground, catchAsync(async (req,res) => {
    const {id} = req.params
    const campground = await Campground.findByIdAndUpdate(id , req.body.campground);
    req.flash('success', 'Successfully updated campground!')
    res.redirect(`/campgrounds/${id}`);
}))

router.delete('/:id', isLoggedIn, catchAsync(async (req,res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground!')
    res.redirect(`/campgrounds`);
}))

module.exports = router;