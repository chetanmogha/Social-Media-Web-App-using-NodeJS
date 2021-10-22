const User=require('../models/user');

module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:"User profile"
    })
}

// render the sign up page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"Chatcom Sign Up"
    })
}


// render the sign in page
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"Chatcom Sign In "
    })
}

//get the sign up data

module.exports.create=function(req,res){
    // will do it later
    if(req.body.password!=req.body.confirmPassword){
        return res.redirect('back')
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("Error in find user in signing up")
        }

        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log("Error in creating user information while signing up")
                }
                return res.redirect('/users/sign-in')
            })
        }
        else{
        return res.redirect('back')
        }
    })

}

// get the sign data
module.exports.createSession=function(req,res){
    // will do it later
}