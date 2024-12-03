const express = require("express");
const cors = require("cors");
const signUpRouter = require("./routes/signUpRouter");
const logInRouter = require("./routes/logInRouter");
const jwt = require("jsonwebtoken");
const app = express();

require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return;
    }
    req.user = user;
    next();
  });
};

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use("/signup", signUpRouter);
app.use("/login", logInRouter);
app.get("/posts", authenticateToken, (req, res) => {
  console.log(req.user);
  res.send(req.user);
});
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}!`));
