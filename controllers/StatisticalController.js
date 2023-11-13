const Report = require('./../model/Report');
const moment = require('moment-timezone');

async function getDailyStats(startDate, endDate) {
    try {
        let matchQuery = { dateTk: {} };

        if (startDate) {
            matchQuery.dateTk.$gte = moment(startDate).startOf('day').toDate();
        }

        if (endDate) {
            matchQuery.dateTk.$lte = moment(endDate).endOf('day').toDate();
        }

        let dailyStats = await Report.aggregate([
            {
                $match: matchQuery
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$dateTk", timezone: "Asia/Ho_Chi_Minh" } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        return dailyStats.map(entry => ({ ...entry, _id: moment(entry._id).format("YYYY-MM-DD") }));
    } catch (error) {
        console.log("Error in getDailyStats():", error);
    }
}

module.exports = { getDailyStats }