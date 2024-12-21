
const express = require('express')
const router = express.Router();
exports.router = router;

const {storage} = require('../cloudinary')
const multer  = require('multer')
const upload = multer({ storage })

const campgrounds=require('../controllers/campgrounds')
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');



router.route('/')
    .get(campgrounds.index)
    // .post(isLoggedIn, validateCampground, campgrounds.createCampground);
    .post(isLoggedIn, upload.array('image'), validateCampground, campgrounds.createCampground);

router.get('/new', isLoggedIn, campgrounds.renderNewForm );


router.route('/:id')
    .get( campgrounds.showCampground)    
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, campgrounds.updateCampground)
    .delete(isLoggedIn, isAuthor, campgrounds.deleteCampground);

router.get('/:id/edit', isLoggedIn, isAuthor, campgrounds.renderEditForm)

module.exports = router;