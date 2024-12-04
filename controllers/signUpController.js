const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const { validateSignUp } = require("../middleware/validateFields");

const signUp = [
  validateSignUp,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
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
      return res
        .status(500)
        .send({ message: "Error signing up", errors: errors.array() });
    }
  },
];

module.exports = { signUp };
