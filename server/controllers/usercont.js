const User = require("../models/userschema");


exports.getUser = (req, res) => {
  res.status(500).redirect(`${process.env.lead}/taken2.html`)
};

exports.createUser = (req, res) => {
  res.status(500).redirect(`${process.env.lead}/taken2.html`)
};

exports.logoutUser = (req,res) => {
  req.session.destroy();
  res.redirect(`${process.env.lead}/index.html`);
};
