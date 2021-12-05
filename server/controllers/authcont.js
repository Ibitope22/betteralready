const jwt = require("jsonwebtoken");
const User = require("../model/userschema");


/**helps creates  tokens */
const iniToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });
};

exports.signUp = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordconfirm,
    });

    const tokens = iniToken(newUser._id);

    res.status(200).json({
      status: "done", tokens,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    if (error.code == "11000") {
      res.status(200).json({
        status: "error",
        message: "Email is Already Exists",
      });
    } else {
      res.status(200).json({
        status: "error",
        message: error,
      });
    }
    console.log(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  /*checks if email  is already in db*/
  if (!email) {
    return res.status(400).json({
      status: "error",
      message: "email and password required",
    });
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkPassword(password, user.password))) {
    return res.status(200).json({
      status: "error",
      message: "invalid email or password",
    });
  }

  const tokens = iniToken(user._id);
  res.status(200).json({
    status: "done",
    tokens,
    data: {
      user,
    },
  });
};
