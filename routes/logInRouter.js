const { Router } = require("express");
const logInRouter = Router();
const logInController = require("../controllers/logInController");
require("dotenv").config();
require("../auth/passport");

logInRouter.post("/", logInController.logIn);

module.exports = logInRouter;
