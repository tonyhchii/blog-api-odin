const jwt = require("jsonwebtoken");
const db = require("../db/queries");
const CustomError = require("../utils/customError");
const bcrypt = require("bcryptjs");

const logIn = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await db.findUserByUsername(username);
  if (!user) {
    throw new CustomError(`User does not exist`, 401);
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new CustomError("Password is incorrect", 401);
  }
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
  const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET);
  res.json({
    token,
    refreshToken,
    message: "JWT created successfully",
  });
};

module.exports = { logIn };
