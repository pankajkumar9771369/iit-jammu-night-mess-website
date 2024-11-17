// Assuming you're using passport-local-mongoose
const User = require('../models/user');

// Rendering SignUp Page
module.exports.RenderSignUp = (req, res) => {
  res.render('user/signup.ejs');
};

// User SignUp logic
module.exports.UserSignUp = async (req, res) => {
  console.log(req.body); 

  try {
    let { username, email, password } = req.body;

    // Validation check
    if (!username || !email || !password) {
      req.flash('error', 'All fields are required');
      return res.redirect('/signup');
    }

    // Create the user
    const newUser = new User({
      email: email,
      username: username,
    });

    // Register the user with password
    const userData = await User.register(newUser, password);

    // Automatically log the user in after registration
    req.login(userData, (err) => {
      if (err) {
        return next(err);
      }
      req.flash('success', 'Welcome to iitjammu night mess website ');
      res.redirect('/dashboard');
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/signup');
  }
};

// Render the LogIn Page
module.exports.RenderLogInPage = (req, res) => {
  res.render('user/login.ejs');
};

// User LogIn logic
module.exports.UserLogIn = async (req, res) => {
  if (res.locals.redirectUrl) {
    return res.redirect(res.locals.redirectUrl);
  }
  req.flash('success', 'Welcome to IIT Jammu Night Mess!');
  res.redirect('/dashboard');
};

// User LogOut logic
module.exports.UserLogOut = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success', 'You have logged out');
    res.redirect('/');
  });
};
