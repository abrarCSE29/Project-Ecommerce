const createError = require("http-errors");
const fs = require("fs");
const User = require("../models/userModel");
const { successResponse, errorResponse } = require("./responseController");
const { default: mongoose } = require("mongoose");
const { findWithId } = require("../services/findWithId");

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 1;

    const searchRegExp = RegExp(".*" + search + ".*", "i");
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };
    const options = { password: 0 };

    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);

    const totalUsers = await User.countDocuments(filter);

    if (users.length) {
      return successResponse(res, {
        statusCode: 200,
        message: "User list is returned from models",
        payload: {
          users: users,
          pagination: {
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: page,
            previousPage: page - 1 > 0 ? page - 1 : null,
            nextPage:
              page + 1 <= Math.ceil(totalUsers / limit) ? page + 1 : null,
          },
        },
      });
    } else {
      errorResponse(res, { statusCode: 404, message: "No users found" });
    }
  } catch (err) {
    next(err);
  }
};

//get user by id

const getUser = async (req, res, next) => {
  const id = req.params.id;
  const options = { password: 0 };
  const user = await findWithId(id, options);
  return successResponse(res, {
    statusCode: 200,
    message: "User list is returned from models",
    payload: {
      user: user,
    },
  });
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const options = { password: 0 };
  const user = await findWithId(id, options);

  
  const userImagePath = user.image;
  fs.access(userImagePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log("user image path does not exist");
    } else {
      fs.unlink(userImagePath, (err) => {
        if (err) {
          throw err;
          console.log("Error deleting file:", err);
        } else {
          console.log("File deleted successfully");
        }
      });
    }
  });

  await User.findByIdAndDelete({_id:id,isAdmin:false});

  return successResponse(res, {
    statusCode: 200,
    message: "User was deleted",
    payload: {
      user: user,
    },
  });
};

module.exports = { getUsers, getUser, deleteUser };
