const passport = require("passport");
const jwt = require("jsonwebtoken");

const logIn = async (req, res, next) => {
  const user = { username: req.body.username, password: req.body.password };
  const token = jwt.sign(user, process.env.JWT_SECRET);
  res.json({ user: { name: user.username }, token: token });
};

module.exports = { logIn };
