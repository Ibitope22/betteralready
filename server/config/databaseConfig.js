const mongoose = require('mongoose')

const databaseConnect = async () =>{
    await mongoose.connect(process.env.DATABASE)
    console.log("Connected to database")
}

module.exports = databaseConnect;