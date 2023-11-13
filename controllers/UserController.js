const User = require('../model/User');

async function getAll() {
    try {
        let users = await User.find({});
        return users;
    } catch (error) {
        console.log("Error in getAll():", error);
    }
}

async function check(id) {
    try {
        console.log("id : " + id);
        let users = await User.findOne({ googleId: id });
        return users;
    } catch (error) {
        console.log("Error in getAll():", error);
    }
}

module.exports = { getAll, check }