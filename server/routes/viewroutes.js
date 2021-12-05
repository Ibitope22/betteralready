const express = require("express");
const mongoose = mongoose("mongoose")

const viewscont = require("../controllers/viewscont");

const router = express.Router();

router.get("/login", viewscont.getLoginForm);
