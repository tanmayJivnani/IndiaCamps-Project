const catchAsync=require('../utils/catchAsync')
const User=require('../models/user')

module.exports.renderRegister = (req, res) => {
    res.render('users/register')
}

module.exports.register = catchAsync(async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = new User({ username, email })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err =>{
            if(err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!')
            res.redirect('/campgrounds')
        })
    } catch (e){
        req.flash('error', e.message)
        res.redirect('/register')
    }
})

module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

module.exports.login = (req, res) => {
    req.flash('success', 'Login Success!')
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}