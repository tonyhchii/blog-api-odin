const express = require("express");
const cors = require("cors");
const signUpRouter = require("./routes/signUpRouter");
const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use("/signup", signUpRouter);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}!`));
