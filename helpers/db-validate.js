const mongoose = require("mongoose");
const Role = require("../models/role");
const User = require("../models/user");

const validateRole = async (role = "") => {
  const fetchRole = await Role.findOne({ role });
  if (!fetchRole) {
    throw new Error("role not allowed ");
  }
};

const validateEmail = async (email) => {
  const fetchEmail = await User.findOne({ email });
  if (fetchEmail) {
    throw new Error("Email is already in use ");
  }
};

const validateUserById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Not a valid id");
  }
  const fetchId = await User.findById(id);
  if (!fetchId) {
    throw new Error("Id does not exist ");
  }
};

module.exports = {
  validateRole,
  validateEmail,
  validateUserById,
};
