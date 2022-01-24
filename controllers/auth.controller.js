const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { createJWT } = require("../helpers/create-jwt");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Wrong email or password.",
      });
    }

    const validatePassword = bcrypt.compareSync(password, user.password);

    if (!validatePassword) {
      return res.status(400).json({
        msg: "Wrong email or password.",
      });
    }

    if (!user.state) {
      return res.status(400).json({
        msg: "Your account is deactivated, please contact the administrator.",
      });
    }

    const token = await createJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Please contact the administratorogin",
    });
  }
};

module.exports = {
  login,
};
