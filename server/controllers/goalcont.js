const userGoal = require("../models/accomplishments");

exports.adduserGoal = async (req, res) => {
  try {
    const goal = await userGoal.findOne({ user_id: req.body.user_id });
    if (goal == null) {
      const goal = new userGoal(req.body);
      const newuserGoal = await goal.save();
      res.status(201).json({
        status: "Goal Added",
        data: {
          goal: newuserGoal,
        },
      });
    } else {
      const newuserGoal = await userGoal.updateOne(
        { user_id: req.body.user_id },
        req.body
      );
      res.status(201).json({
        status: "Goal Added",
        data: {
          goal: newuserGoal,
        },
      });
    }
  } catch (err) {
    res.status(500).redirect(`${process.env.lead}/taken2.html`)
  }
};

exports.getuserGoal = async (req, res) => {
  try {
    const goal = await userGoal.find({ user_id: req.params.id });
    res.status(200).json({
      status: "Here is the goal",
      data: {
        goal,
      },
    });
  } catch (err) {
    res.status(404).redirect(`${process.env.lead}/taken2.html`)
  }
};

exports.updateuserGoal = async (req, res) => {
  try {
    const goal = await userGoal.findByIdAndUpdate(req.params.id, req.params.body, {
      runValidators: true,
      new: true,
    });
    res.status(201).json({
      status: "succesfully updated",
      data: goal,
    });
  } catch (err) {
    res.status(204).redirect(`${process.env.lead}/taken2.html`)
  }
};

exports.deleteuserGoal = async (req, res) => {
  try {
    const goal = await userGoal.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).redirect(`${process.env.lead}/taken2.html`)
  }
};

