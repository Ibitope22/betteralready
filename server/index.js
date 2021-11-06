const mongoose=require('mongoose')
const dotenv = require('dotenv');
const express= require('express');
const app=express();

dotenv.config({path:"../server/config/config.env"});

app.listen(procees.env.PORT, ()=>{
    console.log(`app running on port ${process.env.PORT}`)
});