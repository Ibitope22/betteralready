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
const goalRouter = require("./routes/goalroute");
const userRouter = require("./routes/userRoute");
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');



const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false
}));


const path = require("path");
const users = require('./models/userschema'); /** This line will import the array of data that is in data.js in to the user variaable decalared */
const workouts = require('./models/accomplishments')

dotenv.config({path:"config/config.env"});

betteralready();

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'../index.html')));
app.use(helmet());
app.use(cookieParser());

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


app.use("/api/goals", goalRouter);
app.use("/api/users", userRouter);




app.use((err, req, res, next) => { 
    res.status(404); 
    res.redirect(`${process.env.lead}/taken2.html`)
   }) 
   app.use((req, res) => { 
    res.status(500); 
    res.redirect(`${process.env.lead}/taken2.html`); 
   })
   app.use((req, res) => { 
    res.status(507); 
    res.send("Sorry, we don't have enough storage for this task please reach out to i.fatoki@alustudent.com :)"); 
   })
app.listen(process.env.PORT || 3000, ()=>{
    console.log(`I wish I was dead! but I'm on PORT ${process.env.PORT}`)
});


module.exports = app;