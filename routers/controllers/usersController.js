const { Users } = require("../../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const isExist = await Users.findOne({ where: { email } });
    if (isExist) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      email,
      username,
      password: hashPassword,
      user_id: uuidv4(),
    });
    const token = jwt.sign({user}, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({token});
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    const token = jwt.sign( {user}, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

module.exports = { signUp, signIn };
