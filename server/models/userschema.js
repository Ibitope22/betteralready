const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  
  password: {
    type: String,
  },
  passwordconfirm: {
    type: String,

    validate: {
      validator: function (passwordconfirm) {
        return passwordconfirm === this.password;
      }
    }
  }
});

userSchema.pre("save", async function (next) {

  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 23);
  this.passwordconfirmed = undefined;

  next();

});

userSchema.methods.checkPassword = async function ( enteredpassword, userPassword ){

  return await bcrypt.compare(enteredpassword, userPassword);

};

const User = mongoose.model("userdetails", userSchema);
module.exports = User;
