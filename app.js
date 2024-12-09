const express = require("express");
const cors = require("cors");
const signUpRouter = require("./routes/signUpRouter");
const logInRouter = require("./routes/logInRouter");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const app = express();
const passportAuthenticate = require("./middleware/passportAuthenticate");
const postRouter = require("./routes/postsRouter");

require("dotenv").config();

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use("/signup", signUpRouter);
app.use("/login", logInRouter);
app.use("/posts", passportAuthenticate, postRouter);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}!`));
