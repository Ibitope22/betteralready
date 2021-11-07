const mongoose=require('mongoose')
const dotenv = require('dotenv');
const express= require('express');
const betteralready= require('../server/config/databaseConfig')
const app=express();

const bcrypt = require('bcrypt');
const path = require("path");
const users = require('../server/model/userschema'); /** This line will import the array of data that is in data.js in to the user variaable decalared */


dotenv.config({path:"config/config.env"});

betteralready();

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'../index.html')));


app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'../index.html'));
});


app.post('/register', async (req, res) => { /**This will check if the email adress exists and if it dosen't will creat a new one. */
    try{
        let findUser = await users.findOne({email:req.body.email});
        if (!findUser) {
    
            let hashPassword = await bcrypt.hash(req.body.password, 10);
    
            let newUser = {
                username: req.body.username,
                email: req.body.email,
                password: hashPassword,
                phonenumber: req.body.phonenumber
            };
            await users.create(newUser);

            const userlist= await users.find()

            console.log('User list', userlist);
    
            res.send(`<div align ='center'><h2>You have been added to our cult!</h2></div><br><br><div align='center'><a href='localhost:5500/login.html'>Try login</a></div><br><br><div align='center'><a href='localhost:5500/signup.html'>Add another account</a></div>`);
        } else {
            res.send(`<div align ='center'><h2>Email has been taken sorry!</h2></div><br><br><div align='center'><a href='localhost:5500/signup.html'>Try again</a></div>`);
        }
    } catch{
        res.send("Internal server error :(");
    }
});

app.post('/login', async (req, res) => { /**This will check if the password exists and if it is a match and will allow the user to log in */
    try{
        let findUser = await users.findOne({username:req.body.username});
        if (findUser) {
    
            let submittedPass = req.body.password; 
            let storedPass = findUser.password; 
    
            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                let usrname = findUser.username;
                res.send(`<div align ='center'><h2>login successful</h2></div>
                <br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br>
                <div align='center'><button name="button" type="button" class="button" 
                onclick="location.href='login.html'">logout</button></div>`);
            } else {
                res.send(`<div align ='center'><h2>Invalid email or password</h2>
                </div><br><br><div align ='center'>
                <a href='./login.html'>login again</a></div>`);
            }
        }
        else {
    
            let fakePass = await bcrypt.genSalt(23); /**generates a salt */
            await bcrypt.compare(req.body.password, fakePass);
    
            res.send("<div align ='center'><h2>Wrong email or password</h2></div><br><br><div align='center'><a href='./login.html'>Try again<a><div>");
        }
    } catch{
        res.send("Internal server error");
    }
});

app.use((req, res) => { 
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
    console.log(`I.m awake! ${process.env.PORT}`)
});