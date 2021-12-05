const express = require("express");
const goalcont = require("../controllers/goalcont");

const router = express.Router();

router.route("/").get(goalcont.getAllGoals).post(goalcont.addGoal);
router
  .route("/:id")
  .get(goalcont.getGoal)
  .patch(goalcont.updateGoal)
  .delete(goalcont.deleteGoal);

module.exports = router;
