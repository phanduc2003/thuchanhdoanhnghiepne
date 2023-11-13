const Report = require('./../model/Report');
const moment = require('moment-timezone');


async function insert(reportType, address, describe, image, evaluate, timeDone, note, status) {
    try {
        const vietnamTimeZone = 'Asia/Ho_Chi_Minh';
        const timeStamp = moment().tz(vietnamTimeZone).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

        let report = new Report({ reportType, address, describe, image, evaluate, timeDone, timeStamp, note, status });
        await report.save();
        console.log("Insert success..");
    } catch (error) {
        console.log(error);
    }
}


async function getAll() {
    try {
        let reports = await Report.find({});
        console.log("Reports from MongoDB:", reports); 
        return reports;
    } catch (error) {
        console.log("Error in getAll():", error);
    }
}

async function update(_id, reportType, address, describe, images, evaluate, timeDone, timeStamp, note) {
    try {
        let reports = {
            reportType: reportType,
            address: address,
            describe: describe,
            evaluate: evaluate,
            timeDone: timeDone,
            timeStamp: timeStamp,
            note: note,
            image: images,
        };
        await Report.findByIdAndUpdate({ _id }, reports);
        console.log("update Report success..");
    } catch (error) {
        console.log(error);
    }
}

async function getById(_id) {
    try {
        let reports = await Report.findOne({ _id });
        return reports;
    } catch (error) {
        console.log(error);
    }
}

async function deleteById(_id) {
    try {
        let reports = await Report.findOneAndRemove({ _id });
        console.log("Delete success...");
        return reports;
    } catch (error) {
        console.log(error);
    }
}

async function updateStatus(_id, status) {
    try {
        await Report.findByIdAndUpdate(_id, { status });
        console.log(`Update status success for report ${_id}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {insert, getAll, deleteById, update, getById, updateStatus}