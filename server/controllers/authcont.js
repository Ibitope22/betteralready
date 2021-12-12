const JWT = require("jsonwebtoken");
const User = require("../models/userschema");

const entranceStamp = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });
};

exports.signUp = async (req, res, next) => {
  try {

    let findUser = await User.findOne({email:req.body.email});

    if (!findUser) {

    const registration = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordconfirm: req.body.passwordconfirm
    });
    const token = entranceStamp(registration._id);

    res.status(200).redirect(`${process.env.lead}/login.html`)
  }
  else {
    res.redirect(`${process.env.lead}/taken.html`)
}

  } catch (err) {
    res.status(200).redirect(`${process.env.lead}/taken2.html`)
    console.log(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(200).redirect(`${process.env.lead}/login.html`)
    
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkPassword(password, user.password))) {
    return res.status(200).redirect(`${process.env.lead}/invalid.html`)
  }

  const token = entranceStamp(user._id);
  res.status(200).redirect(`${process.env.lead}/fitness.html`)
};
