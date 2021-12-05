const Achievements = require("../model/goalschema");


exports.getAllGoals = async (req, res) => {
  try {
    const goals = await Achievements.find();
    res.status(200).json({
      status: "done", data: {goals,},
    });
  } catch (err) {
    res.status(404).json({
      status: "Sorry, we don't have what you're looking for yet, do send an email to i.fatoki@alustudent.com to request a feature :)",
      message: err,
    });
  }
};


exports.getGoal = async (req, res) => {
  try {
    const goal = await Achievements.find({ user_id: req.params.id });
    res.status(200).json({status: "done", data: {goal,},
    });
  } catch (err) {
    res.status(404).json({
      status: "Sorry, we don't have what you're looking for yet, do send an email to i.fatoki@alustudent.com to request a feature :)",
      message: err,
    });
  }
};


exports.addGoal = async (req, res) => {
  try {
    const goal = await Achievements.findOne({ user_id: req.body.user_id });
    if (goal == null) {
     
      const goal = new Achievements(req.body);
      const newGoal = await goal.save();
      res.status(201).json({status: "done", data: {goal: newGoal,},
      });

    } else {
      const newGoal = await Achievements.updateOne(
        { user_id: req.body.user_id }, req.body);
      res.status(201).json({status: "done",data: {goal: newGoal,},
       });
    }
  } catch (err) {
    res.status(500).json({
      status: "The server has encountered a situation it does not know how to handle but we will be back :)",
      message: err,
    });
    console.log(err);
  }
};


exports.updateGoal = async (req, res) => {
  try {
    const goal = await Achievements.findByIdAndUpdate(req.params.id, req.params.body, {
      runValidators: true,
      new: true,
    });
    res.status(201).json({status: "updated", data: goal,});
  } catch (err) {
    res.status(204).json({
      status: "error",
      message: err,
    });
  }
};


exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Achievements.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: "done", data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};
