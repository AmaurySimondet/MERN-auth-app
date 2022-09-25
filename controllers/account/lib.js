const User = require("../../schema/schemaUser.js");
const passwordHash = require("password-hash");
const session = require('cookie-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const express = require("express");
const config = require("../../config/config");
const findOrCreate = require('mongoose-findorcreate');
const jwt = require('jsonwebtoken');

const app = express();

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//FACEBOOK
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: config.FACEBOOK_CLIENT_ID,
    clientSecret: config.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/dashboard"
  },
  function(accessToken, refreshToken, profile, cb) {
//  console.log(profile);
    try {
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      if (err){alert(error)};
      return cb(err, user);
    });
    }
    catch (error) {
      alert(error);
    }
  }
));

function facebook(req, res) {
        passport.authenticate("facebook", { failureRedirect: '/login' }, function (err, user, info) {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                if (!user) {
                    res.json({ success: false, message: "username or password incorrect" });
                }
                else {
                    const token = jwt.sign({ email: user.email, username: user.username }, secretkey, { expiresIn: "24h" });
                    res.json({ success: true, message: "Authentication successful", token: token });
                }
            }
        })(req, res);
};

//SIGNUP
async function signup(req, res) {
    User.register(
        {username: req.body.username, email: req.body.email},
        req.body.password,
        function(err,user){
            if(err){
                res.json({ success: false, message: "Your account could not be saved. Error: " + err });
            }else{
                passport.authenticate("local")(req,res,function(){
                    const token = jwt.sign({ email: user.email, username: user.username }, config.secret, { expiresIn: "24h" });
                    res.json({ success: true, message: "Register successful", token: token });
                });
            };
    });
};


//LOGIN
async function login(req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    if (!req.body.username) {
        res.json({ success: false, message: "Username was not given" })
    }
    else if (!req.body.password) {
        res.json({ success: false, message: "Password was not given" })
    }

    else {req.login(user, function(err){
        if(err){
            console.log(err);
        }else{
            passport.authenticate("local", function (err, user, info) {
                if (err) {
                    res.json({ success: false, message: err.toString() });
                }
                else {
                    if (!user) {
                        res.json({ success: false, message: "username or password incorrect" });
                    }
                    else {
                        const token = jwt.sign({ email: user.email, username: user.username }, config.secret, { expiresIn: "24h" });
                        res.json({ success: true, message: "Login successful", token: token });
                    }
                }
            })(req, res);
        };
    });
    }
};

//On exporte nos deux fonctions
exports.login = login;
exports.signup = signup;
exports.facebook = facebook;