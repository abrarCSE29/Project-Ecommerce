const app = require("./app");
const connectDB = require("./config/connectDB");
const { serverPort } = require("./secret");


/**
 * Starts the server and listens for incoming connections.
 *
 * @param {number} serverPort - The port number on which the server should listen for incoming connections.
 * @param {function} callback - A function to be called when the server starts listening.
 *
 * @returns {void}
 */
app.listen(serverPort, async() => {
    console.log(`Server is running on port ${serverPort}`);
    await connectDB();
})