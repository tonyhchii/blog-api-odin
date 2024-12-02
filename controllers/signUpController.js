const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const validateForm = [
  body("username")
    .isLength({ max: 20, min: 4 })
    .withMessage("Username needs to be within 4-20 characters")
    .isAlphanumeric()
    .withMessage("Username needs to be alphanumeric"),
  body("password")
    .isLength({ min: 4, max: 24 })
    .withMessage("Password needs to be within 4-24 characters"),
  body("passwordConfirmation")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match"),
];

const signUp = [
  (req, res) => {
    console.log(req.body);
    res.send(`${req.body.user}, ${req.body.password}`);
  },
];

module.exports = { signUp };
