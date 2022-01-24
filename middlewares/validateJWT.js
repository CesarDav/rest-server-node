const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No token in the request",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);

    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: "Token not valid - The user is not in the database. ",
      });
    }

    if (!user.state) {
      return res.status(401).json({
        msg: "Token not valid - user with status : False",
      });
    }

    req.uid = uid;
    req.authenticatedUser = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token not valid",
    });
  }
};

module.exports = {
  validateJWT,
};
