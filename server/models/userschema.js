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
  passwordConfirm: {
    type: String,

    validate: {
      validator: function (passwordConfirm) {
        return passwordConfirm === this.password;
      }
    }
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirmed = undefined;
  next();
});

userSchema.methods.checkPassword = async function (
  potentialPassword,
  userPassword
) {
  return await bcrypt.compare(potentialPassword, userPassword);
};

const User = mongoose.model("userdetails", userSchema);

module.exports = User;
