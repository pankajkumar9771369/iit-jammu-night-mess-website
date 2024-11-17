const express=require('express');
const router=express.Router();
const passport=require('passport');
const wrapAsync = require('../utils/wrapAsync');
const { SaveRedirectUrl } = require('../middleware');
const UserController=require('../controllers/users');


router.route('/signup')
      .get(UserController.RenderSignUp)
      .post(wrapAsync(UserController.UserSignUp));


router.route('/login')
      .get(UserController.RenderLogInPage)
      .post(SaveRedirectUrl,
        passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}),
        UserController.UserLogIn);

router.get('/logout',wrapAsync(UserController.UserLogOut));

module.exports=router;