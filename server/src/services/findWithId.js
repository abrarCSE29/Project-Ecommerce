const { default: mongoose } = require("mongoose");
const createError = require("http-errors");
const findWithId = async (Model,id, options={}) => {
  try {
    const item = await Model.findById(id, options);
    if (!item) {
        throw createError(404, `${Model.modelName}  not found with this id`);
    }
    return item;
  } catch (err) {
    if (err instanceof mongoose.Error) {
      throw createError(400, `invalid ${Model.modelName}  id`);
    }
    throw err;
  }
};

module.exports = { findWithId };
