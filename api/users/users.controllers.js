const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ganerateToken = (user) => {
  const payload = {
    username: user.username,
    _id: user._id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET);
};
exports.signup = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create(req.body);

    const token = ganerateToken(newUser);

    return res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res) => {
  try {
    const token = await ganerateToken(req.user);
    return res.status(201).json({ token });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};
