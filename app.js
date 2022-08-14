const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
// require("./db/db");
const { sequelize } = require("./models/index");
sequelize.sync();
const usersRouter = require("./routers/routes/usersRouter");  
const coursesRouter = require("./routers/routes/coursesRouter");
const reviewsRouter = require("./routers/routes/reviewsRouter");


app.use(express.json());
app.use(cors());
app.use("/users", usersRouter);
app.use("/courses", coursesRouter);
app.use("/reviews", reviewsRouter);


////////////////////////////
const Port = 5000;
app.listen(Port, () => {
  console.log("server is running");
});
