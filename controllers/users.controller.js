const { response } = require("express");

const getUsers = (req, res = response) => {
  res.json({
    msg: "get api - controller",
  });
};

const postUsers = (req, res = response) => {
  res.json({
    msg: "post api",
  });
};

const putUsers = (req, res = response) => {
  res.json({
    msg: "put api",
  });
};

const deleteUsers = (req, res = response) => {
  res.json({
    msg: "delete api",
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
};
