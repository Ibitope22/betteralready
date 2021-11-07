const mongoose=require('mongoose')
const dotenv = require('dotenv');
const express= require('express');
const app=express();

dotenv.config({path:"config/config.env"});

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`I.m awake! ${process.env.PORT}`)
});