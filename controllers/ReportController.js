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

async function update(_id, reportType, address, describe, image, evaluate, timeDone, timeStamp, note, status) {
    try {
        let reports = {
            reportType: reportType,
            address: address,
            describe: describe,
            evaluate: evaluate,
            timeDone: timeDone,
            timeStamp: timeStamp,
            note: note,
            status: status,
            image: image,
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

module.exports = {insert, getAll, deleteById, update, getById}