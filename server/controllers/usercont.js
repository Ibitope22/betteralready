const User = require("../model/userschema");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({status: "done", data: { users, },
    });
  } catch (err) {
    res.status(404).json({
      status: "Sorry, we don't have what you're looking for yet, do send an email to i.fatoki@alustudent.com to request a feature :)",
      message: err,
    });
  }
};

exports.getUser = (req, res) => {
  res.status(500).json({ status: "error",
    message: "The server has encountered a situation it does not know how to handle but we will be back :)",
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "The server has encountered a situation it does not know how to handle but we will be back :)",
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "The server has encountered a situation it does not know how to handle but we will be back :)",
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "The server has encountered a situation it does not know how to handle but we will be back :)",
  });
};
