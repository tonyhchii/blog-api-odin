const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

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
    const errors = [];
    if (errors) {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        // add database entry here
        const user = await db.createUser(
          req.body.username,
          hashedPassword,
          req.body.email
        );
        res.send(user);
      });
    } else {
      return res.status(500).send({ message: "Error signing up", errors: err });
    }
  },
];

module.exports = { signUp };
