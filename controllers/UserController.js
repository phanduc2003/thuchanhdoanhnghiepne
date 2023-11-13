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

async function getById(_id) {
    try {
        let user = await User.findOne({ _id });
        return user;
    } catch (error) {
        console.log(error);
    }
}

async function updateStatus(_id, status) {
    try {
        await User.findByIdAndUpdate(_id, { status });
        console.log(`Update status success for User ${_id}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getAll, check, getById, updateStatus }