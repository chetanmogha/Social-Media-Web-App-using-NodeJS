const express= require('express');
const cookieParser=require('cookie-parser');
const app=express();
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy')
//const Chat=require('./models/chat');
const expressLayouts=require('express-ejs-layouts')

app.use(cookieParser());
app.use(expressLayouts);
app.use(express.urlencoded());
// extract style and scripts from sub pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// setup the views engine

app.set('view engine','ejs')
app.set('views','./views');

app.use(session({
    name:"ChatCom",
    // change the secret before deployment
    secret:'blahblah',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(100*60*100)
    }

}))
app.use(passport.initialize());
app.use(passport.session());
// use express router
app.use('/',require('./routes/index'))
app.use(express.static('assets'));

app.use(passport.setAuthenticatedUser);
app.listen(8000,(err)=>{
    if(err){
        console.log(`Error on running server ${err}`);
    }

    console.log(`Server is running at port : ${8000}`);
})