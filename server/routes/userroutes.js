const express = require("express");
const usercont = require("../controllers/usercont");
const authcont = require("../controllers/authcont");

const router = express.Router();

router.post("/signup", authcont.signUp);
router.post("/login", authcont.login);

router
  .route("/")
  .get(usercont.getAllUsers)
  .post(usercont.createUser);

router
  .route("/:id")
  .get(usercont.getUser)
  .patch(usercont.updateUser)
  .delete(usercont.deleteUser);

module.exports = router;
