const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const createError = require("http-errors");
const findUserById = async (id) => {
  try {
    const option = { password: 0 };
    const user = await User.findById(id, option);
    if (!user) {
      throw createError(404, "user  not found with this id");
    }
    return user;
  } catch (err) {
    if (err instanceof mongoose.Error) {
      throw createError(400, "invalid user id");
    }
    throw err;
  }
};

module.exports = { findUserById };
