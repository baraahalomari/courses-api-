const usersRoutes = require("express").Router();

const { signUp, signIn } = require("../controllers/usersController");

usersRoutes.post("/signup", signUp);
usersRoutes.post("/signin", signIn);

module.exports = usersRoutes;
