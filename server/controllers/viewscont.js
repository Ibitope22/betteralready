const express = require("express");
const mongoose = mongoose("mongoose")

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Login",
  });
};
