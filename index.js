const express= require('express');
const app=express();

// use express router
app.use('/',require('./routes/index'))

app.listen(8000,(err)=>{
    if(err){
        console.log(`Error on running server ${err}`);
    }

    console.log(`Server is running at port : ${8000}`);
})