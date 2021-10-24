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

module.exports=passport;