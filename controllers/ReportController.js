const Report = require('./../model/Report');


async function insert(reportType, address, describe, image, evaluate, timeDone, timeStamp, note, status) {
    try {
        let report = new Report({ reportType, address, describe, image, evaluate, timeDone, timeStamp, note, status });
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

module.exports = {insert, getAll }