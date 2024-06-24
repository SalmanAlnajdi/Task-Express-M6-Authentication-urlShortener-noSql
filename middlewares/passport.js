// middlewares/passport.js
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const localStrategy = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
  },
  async (username, password, next) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return next({ msg: "Username or password is wrong!" });
      }
      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword == false) {
        return next({ msg: "Username or password is wrong!" });
      }
      next(false, user); //req.user
    } catch (error) {
      next(error);
    }
  }
);

module.exports = { localStrategy };
