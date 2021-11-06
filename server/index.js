const mongoose=require('mongoose')
const dotenv = require('dotenv');
const express= require('express');
const app=express();

dotenv.config({path:"config/config.env"});

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`app running on port ${process.env.PORT}`)
});