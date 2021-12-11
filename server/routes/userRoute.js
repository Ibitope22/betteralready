const express = require("express");
const usercont = require("../controllers/usercont");
const authcont = require("../controllers/authcont");

const route = express.Router();

route.post("/register", authcont.signUp);
route.post("/login", authcont.login);

route
  .route("/")
  .post(usercont.createUser);

route
  .route("/:id")
  .get(usercont.getUser)
module.exports = route;
