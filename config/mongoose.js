const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/Chat_DB');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error while loading Database"));

db.once('open',()=>{
    console.log("Database Successfully connected");
})