const Type = require('../model/Type');

async function getAll() {
    try {
        let type = await Type.find({});
        return type;
    } catch (error) {
        console.log(error);
    }
}

async function insert(nameType) {
    try {
        const newType = new Type({ nameType });
        await newType.save();
        console.log("Insert Type Success.");
        return newType; 
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {getAll, insert}