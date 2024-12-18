const express = require('express')
const router = express.Router({ mergeParams: true });
const users = require('../controllers/users')
const passport = require('passport');
const {storeReturnTo} = require('../middleware');

//Register Routes
router.route('/register')
    .get(users.renderRegister)
    .post(users.register)

//LOGIN
router.route('/login')
    .get(users.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.login)

//LOGOUT
router.get('/logout', users.logout); 

module.exports = router