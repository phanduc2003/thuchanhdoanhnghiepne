const express = require('express');
const moment = require('moment-timezone');
const router = express.Router();
let ReportController = require('./../controllers/ReportStatsController');

//THONG KE
router.get('/', async (req, res) => {
    try {
        // Fetch data for statistical report
        let dailyStats = await ReportController.getDailyStats();

        res.render('stats/reportStats', { dailyStats });
    } catch (error) {
        console.log("Error in stats route:", error);
    }
});


router.get('/daily', async (req, res) => {
    try {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;

        let dailyStats = await ReportController.getDailyStats(startDate, endDate);
        res.json(dailyStats);
    } catch (error) {
        console.log("Error in daily stats route:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;