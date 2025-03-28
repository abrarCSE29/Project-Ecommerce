const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const createError = require("http-errors");
const findWithId = async (id, options={}) => {
  try {
    const item = await User.findById(id, options);
    if (!item) {
      throw createError(404, "item  not found with this id");
    }
    return item;
  } catch (err) {
    if (err instanceof mongoose.Error) {
      throw createError(400, "invalid item id");
    }
    throw err;
  }
};

module.exports = { findWithId };
