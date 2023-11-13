const Report = require('./../model/Report');
const moment = require('moment-timezone');


async function insert(reportType, originOfReport, nameOfSender, nameOfRecipient, address, describe, image, date, sendTime, receiveTime, doneTime, note, evaluate, status) {
    try {
        let report = new Report({ reportType, originOfReport, nameOfSender, nameOfRecipient, address, describe, image, date, sendTime, receiveTime, doneTime, note, evaluate, status });
        await report.save();
        console.log("Insert success..");
    } catch (error) {
        console.log(error);
    }
}

async function update(_id, reportType, originOfReport, nameOfSender, nameOfRecipient, address, describe, image, date, sendTime, receiveTime, doneTime, note, evaluate, status) {
    try {
        let reports = {
            reportType: reportType,
            originOfReport: originOfReport,
            nameOfSender: nameOfSender,
            nameOfRecipient: nameOfRecipient,
            address: address,
            describe: describe,
            image: image,
            date: date,
            sendTime: sendTime,
            receiveTime: receiveTime,
            doneTime: doneTime,
            note: note,
            evaluate: evaluate,
            status: status,
        };
        await Report.findByIdAndUpdate({ _id }, reports);
        console.log("update Report success..");
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

async function test() {
    try {
        const reports = await Report.aggregate([
            {
                $group: {
                    _id: {
                        report: reportType,
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        return reports;
    } catch (err) {
        console.error(err);
        res.send("Error : " + err);
    }
}

module.exports = { insert, update, getAll, getReportNow, getReportFixing, getReportDone, test }