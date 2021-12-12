const express = require("express");
const goalcont = require("../controllers/goalcont");

const router = express.Router();

router.route("/").post(goalcont.adduserGoal);

router
  .route("/:id")
  .get(goalcont.getuserGoal)
  .patch(goalcont.updateuserGoal)
  .delete(goalcont.deleteuserGoal);

module.exports = router;