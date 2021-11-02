const express= require('express');
const cookieParser=require('cookie-parser');
const app=express();
const expressLayouts=require('express-ejs-layouts')
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy')
const MongoStore = require('connect-mongo')
const sassMiddleware=require('node-sass-middleware')

app.use(sassMiddleware({
   src:'./assets/scss',
   dest:'./assets/css',
   debug:true, 
   outputStyle:'extended',
   prefix:'/css'
}))
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));

app.use(expressLayouts);


// extract style and scripts from sub pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// setup the views engine

app.set('view engine','ejs')
app.set('views','./views');

// mongo store is used to store the sesssion cookie in the db
app.use(session(
    {
    name:"ChatCom",
    // change the secret before deployment
    secret:'blahblah',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create(
        {
        mongoUrl:'mongodb://localhost/Chat_DB',
        autoRemove:'disabled'
    },
    function(err){
        console.log('Connect-mongo db setup is ok')
    } 
 
    )
    
}));
app.use(passport.initialize());
app.use(passport.session());
// use express router

app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes/index'))

app.listen(8000,(err)=>{
    if(err){
        console.log(`Error on running server ${err}`);
    }

    console.log(`Server is running at port : ${8000}`);
})