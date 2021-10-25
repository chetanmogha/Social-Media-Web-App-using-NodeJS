const passport=require('passport')
const User=require('../models/user')
const LocalStrategy=require('passport-local').Strategy;

// authentication using local passport
passport.use(new LocalStrategy({
    usernameField:'email'
},
    function(email,password,done){
        User.findOne({email:email},function(err,user){
            if(err){
                console.log("Error in finding user in passport")
                return done(err);
            }

            if(!user || user.password !=password){
                console.log("Invalid Username/Password")
                return done(null,false)
            }
                return done(null,user);
        })
    }
));

//Serializing the user to decide which key is to be in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})

//deserializer the user
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding errot")
        }
        return done(null,user)

    })
})

//check if the user is authenticated

passport.checkAuthentication=function(req,res,next){
    // if the user is signed in, then pass on the request to the next function
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    res.redirect('/users/sign-in')
}

// set the user information in the middleware
passport.setAuthenticatedUser=function(req,res,next){
    if(!req.isAuthenticated()){
        //req.user contains the information of current user 
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;