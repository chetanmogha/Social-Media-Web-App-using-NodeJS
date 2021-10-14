const express= require('express');

const app=express();
const db=require('./config/mongoose');
const Chat=require('./models/chat');
// use express router
app.use('/',require('./routes/index'))

// setup the views engine

app.set('view engine','ejs')
app.set('views','./views');
app.use(express.urlencoded());
app.use(express.static('assets'));

app.listen(8000,(err)=>{
    if(err){
        console.log(`Error on running server ${err}`);
    }

    console.log(`Server is running at port : ${8000}`);
})