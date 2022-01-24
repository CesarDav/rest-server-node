const { response, request } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const status = { state: true };

  // const users = await User.find().skip(Number(from)).limit(Number(limit));
  // const total = await User.countDocuments();

  const [total, users] = await Promise.all([
    User.countDocuments(status),
    User.find(status).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

const postUsers = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //has password
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(password, salt);

  //save data
  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }
  res.json({
    msg: "post api - controller",
    user,
  });
};

const putUsers = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, ...rest } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync(10);
    rest.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json({
    msg: "put api - controller",
    user,
  });
};

const deleteUsers = async (req = request, res = response) => {
  const { id } = req.params;

  //delete from database(not recommended)
  // const user = await User.findByIdAndDelete(id);

  const user = await User.findByIdAndUpdate(id, { state: false });
  const { authenticatedUser } = req;
  res.json({
    user,
    authenticatedUser,
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
};
