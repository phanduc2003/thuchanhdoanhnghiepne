const Report = require('./../model/Report');


async function insert(reportType, originOfReport, nameOfSender, nameOfRecipient, address, describe, image, date, sendTime, receiveTime, doneTime, note, evaluate, status) {
    try {
        let report = new Report({ reportType, originOfReport, nameOfSender, nameOfRecipient, address, describe, image, date, sendTime, receiveTime, doneTime, note, evaluate, status });
        await report.save();
        console.log("insert success..");
    } catch (error) {
        console.log(error);
    }
}

async function getAll() {
    try {
        let reports = await Report.find({});
        console.log("Reports from MongoDB:", reports); // Thêm dòng này để ghi log dữ liệu
        return reports;
    } catch (error) {
        console.log("Error in getAll():", error);
    }
}

async function getReportNow() {
    try {
        let now = await Report.find({ status : 0 });
        return now;
    } catch (error) {
        console.error(error);
    }
}

async function getReportFixing() {
    try {
        let fixing = await Report.find({ status: 1 });
        return fixing;
    } catch (error) {
        console.error(error);
    }
}

async function getReportDone() {
    try {
        let done = await Report.find({ status: 2 });
        return done;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { insert, getAll, getReportNow, getReportFixing, getReportDone }