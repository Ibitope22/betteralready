const mongoose=require('mongoose')
const dotenv = require('dotenv');
const express= require('express');
const betteralready= require('../server/config/databaseConfig')
const app=express();

const bcrypt = require('bcrypt');
const path = require("path");
const users = require('../server/script/data').userDB; /** This line will import the array of data that is in data.js in to the user variaable decalared */


dotenv.config({path:"config/config.env"});

betteralready();

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'../index.html')));


app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'../index.html'));
});


app.post('/register', async (req, res) => { /**This will check if the email adress exists and if it dosen't will creat a new one. */
    try{
        let foundUser = users.find((data) => req.body.email === data.email);
        if (!foundUser) {
    
            let hashPassword = await bcrypt.hash(req.body.password, 10);
    
            let newUser = {
                username: req.body.username,
                email: req.body.email,
                password: hashPassword,
                phonenumber: req.body.phonenumber
            };
            users.push(newUser);
            console.log('User list', users);
    
            res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
        } else {
            res.send("<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='./registration.html'>Register again</a></div>");
        }
    } catch{
        res.send("Internal server error");
    }
});

app.post('/login', async (req, res) => { /**This will check if the password exists and if it is a match and will allow the user to log in */
    try{
        let foundUser = users.find((data) => req.body.email === data.email);
        if (foundUser) {
    
            let submittedPass = req.body.password; 
            let storedPass = foundUser.password; 
    
            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                let usrname = foundUser.username;
                res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br><div align='center'><a href='./login.html'>logout</a></div>`);
            } else {
                res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
            }
        }
        else {
    
            let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
            await bcrypt.compare(req.body.password, fakePass);
    
            res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
        }
    } catch{
        res.send("Internal server error");
    }
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`I.m awake! ${process.env.PORT}`)
});