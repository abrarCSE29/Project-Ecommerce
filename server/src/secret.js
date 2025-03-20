require('dotenv').config();
const serverPort = process.env.SERVER_PORT || 3002
const mongoDbUrl = process.env.MONGODB_URL||"mongodb://127.0.0.1:27017"
module.exports = {serverPort,mongoDbUrl}