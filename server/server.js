const mongoose = require("mongoose");
const dotenv = require("dotenv");
const betteralready= require('./config/databaseConfig')


dotenv.config({path:"config/config.env"});

betteralready();

const app = require("./app");

app.listen(process.env.PORT || 3000, ()=>{
  console.log(`I wish I was dead! ${process.env.PORT}`)
});