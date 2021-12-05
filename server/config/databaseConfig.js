const mongoose = require('mongoose')

const databaseConnect = async () =>{
    await mongoose.connect(process.env.DATABASE)
    console.log("I'm runing stop stressing 🥲")
}

module.exports = databaseConnect;