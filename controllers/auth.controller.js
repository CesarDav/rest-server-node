const { response, request, json } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { createJWT } = require("../helpers/create-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req = request, res = response) => {
  const { ID_TOKEN } = req.body;

  try {
    const { name, email, picture } = await googleVerify(ID_TOKEN);

    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        email,
        name,
        password: " ",
        image: picture,
        google: true,
        role: "ADMIN_ROLE",
      };

      user = new User(data);
      await user.save();
    }
    if (!user.state) {
      return res.status(401).json({
        msg: "Your account is deactivated, please contact the administrator.",
      });
    }

    const token = await createJWT(user.id);

    res.json({
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Token could not be verified ",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
