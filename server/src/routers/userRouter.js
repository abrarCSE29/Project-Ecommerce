const express = require("express");
const userRouter = express.Router();

const users = [
    {id: "1", name: "John Doe"},
    {id: "2", name: "Jane Doe"},
    {id: "3", name: "Mike Doe"}
];

userRouter.get("/", (req, res) => {
    res.status(200).json({
        message: "User list is returned",
        users : users
    });
});

module.exports = userRouter;


