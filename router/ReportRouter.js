const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

let ReportController = require('./../controllers/ReportController');
let uploadMiddleware = require('../middleware/upload');

router.get('/', async (req, res, next) => {
    try {
        let reports = await ReportController.getAll();
        reports = reports.map((el, index) => {
            return {
                _id: el._id,
                reportType: el.reportType,
                address: el.address,
                describe: el.describe,
                timeDone: el.timeDone,
                timeStamp: el.timeStamp,
                image: el.image,
                note: el.note,
                status: el.status,
                index: index + 1,
            }
        });
        res.render('reportList', { rp : reports });
        console.log(reports);
    } catch (error) {
        console.log("Error in getAll():", error);
    }
});

//INSERT ENEMY
router.get('/new', (req, res) => {
    res.render('reportNew');
});

//HANDLE INSERT ENEMY
router.post('/new',[uploadMiddleware.single('image'),],async (req,res,next)=>{
    try {
        let { file } = req;
        let status = req.body.status ? true : false;
        let { reportType, address, describe, image, evaluate, timeDone, timeStamp, note } = req.body;
        image = file ? file.filename : '';
        await ReportController.insert(reportType, address, describe, image, evaluate, timeDone, timeStamp, note, status);
        res.redirect('/reports');
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;