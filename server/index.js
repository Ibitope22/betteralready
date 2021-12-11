const mongoose=require('mongoose')
const dotenv = require('dotenv');
const express= require('express');
const betteralready= require('../server/config/databaseConfig')
const app=express();
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");



const bcrypt = require('bcrypt');
const path = require("path");
const users = require('./model/userModel'); /** This line will import the array of data that is in data.js in to the user variaable decalared */
const workouts = require('../server/model/goalModel')

dotenv.config({path:"config/config.env"});

betteralready();

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'../index.html')));
app.use(helmet());


const limiter = rateLimit({
    max: 50,
    windowMs: 60 * 60 * 1000,
    message: "Please try again later",
  });

  app.use("/api", limiter);
  app.use(xss());

  app.use(cors());
app.use(morgan("dev"));

  app.use(express.json({ limit: "10kb" }));
  app.use(mongoSanitize());


app.use("/api/v1/goals", goalRouter);
app.use("/api/v1/users", userRouter);


app.all("*", (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl}`);
    err.status = "fail";
    err.statusCode = 404;
    next(err);
  });


app.use((err, req, res, next) => { 
    res.status(404); 
    res.send("Sorry, we don't have what you're looking for yet, do send an email to i.fatoki@alustudent.com to request a feature :)"); 
   }) 
   app.use((req, res) => { 
    res.status(500); 
    res.send("The server has encountered a situation it does not know how to handle but we will be back :)"); 
   })
   app.use((req, res) => { 
    res.status(507); 
    res.send("Sorry, we don't have enough storage for this task please reach out to i.fatoki@alustudent.com :)"); 
   })
app.listen(process.env.PORT || 3000, ()=>{
    console.log(`I wish I was dead! ${process.env.PORT}`)
});