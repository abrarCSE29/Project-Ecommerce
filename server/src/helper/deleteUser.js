const { log } = require("console");

const fs = require("fs").promises;

const deleteImage = async (userImagePath) => {
    try{
        await fs.access(userImagePath);
        await fs.unlink(userImagePath);
        console.log("Image deleted successfully");
    }catch(err){
        console.error("Error deleting image:", err);
    }
};
module.exports = {deleteImage};