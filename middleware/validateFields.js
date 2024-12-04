const db = require("../db/queries");
const { body } = require("express-validator");
const validateSignUp = [
  body("username")
    .isLength({ max: 20, min: 4 })
    .withMessage("Username needs to be within 4-20 characters")
    .isAlphanumeric()
    .withMessage("Username needs to be alphanumeric")
    .custom(async (value) => {
      const user = await db.findUserByUsername(value);
      if (user) {
        throw new Error("Username already in use");
      }
    }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage(`Email is required`)
    .isEmail()
    .withMessage(`Email is improper format`)
    .custom(async (value) => {
      const user = await db.findUserByEmail(value);
      if (user) {
        throw new Error("Email is already in use");
      }
    }),
  body("password")
    .isLength({ min: 4, max: 24 })
    .withMessage("Password needs to be within 4-24 characters"),
  body("passwordConfirmation")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match"),
];

module.exports = { validateSignUp };
