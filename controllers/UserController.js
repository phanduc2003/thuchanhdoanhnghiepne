const User = require('./../model/User');

async function getAll() {
    try {
        let users = await User.find({}); 
        return users;
    } catch (error) {
        console.log("Error in getAll():", error);
    }
}

module.exports = { getAll }