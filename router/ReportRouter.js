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
                originOfReport: el.originOfReport,
                nameOfSender: el.nameOfSender,
                nameOfRecipient: el.nameOfRecipient,
                address: el.address,
                describe: el.describe,
                image: el.image,
                date: el.date,
                sendTime: el.sendTime,
                receiveTime: el.receiveTime,
                doneTime: el.doneTime,
                note: el.note,
                evaluate: el.evaluate,
                status: el.status,
                index: index + 1,
            }
        });
        res.render('reportList', { rp: reports });
        console.log(reports);
    } catch (error) {
        console.log("Error in getAll():", error);
    }
});

//App

router.get('/app', async (req, res, next) => {
    try {
        let reports = await ReportController.getReportNow();
        res.send(reports)
        console.log(reports);
    } catch (error) {
        console.log("Error in getAll():", error);
    }
});

router.get('/appFixing', async (req, res, next) => {
    try {
        let reports = await ReportController.getReportFixing();
        res.send(reports)
        console.log("OK");
    } catch (error) {
        console.log("Error in getAll():", error);
    }
});

router.get('/appDone', async (req, res, next) => {
    try {
        let reports = await ReportController.getReportDone();
        res.send(reports)
        console.log("OK");
    } catch (error) {
        console.log("Error in getAll():", error);
    }
});
//INSERT ENEMY
router.get('/new', (req, res) => {
    res.render('reportNew');
});

//HANDLE INSERT ENEMY
router.post('/new', [uploadMiddleware.single('image'),], async (req, res, next) => {
    try {
        let { file } = req;
        let { reportType, originOfReport, nameOfSender, nameOfRecipient, address, describe, image, date, sendTime, receiveTime, doneTime, note, evaluate, status } = req.body;
        // image = file ? file.filename : '';
        await ReportController.insert(reportType, originOfReport, nameOfSender, nameOfRecipient, address, describe, image, date, sendTime, receiveTime, doneTime, note, evaluate, status);
        console.log("Successful")
        res.send("Successful")
    } catch (error) {
        console.log(error);
    }
});

//UPDATE
router.get('/:id/edit', async function (req, res, next) {
    let _id = req.params.id;
    try {
        let reports = await ReportController.getById(_id);
        res.render('service_report/reportEdit', { rp: reports });
    } catch (error) {
        console.log(error);
    }
});

//HANDLE UPDATE
router.post('/:id/edit', [uploadMiddleware.single('image'),], async function (req, res, next) {
    let _id = req.params.id;
    try {
        let { file } = req;
        let { reportType, originOfReport, nameOfSender, nameOfRecipient, address, describe, image, date, sendTime, receiveTime, doneTime, note, evaluate, status } = req.body;
        // if (file) {
        //     image = file.filename;
        // } else {
        //     image = image;
        // }
        await ReportController.update(_id, reportType, originOfReport, nameOfSender, nameOfRecipient, address, describe, image, date, sendTime, receiveTime, doneTime, note, evaluate, status);
        console.log(_id)
        res.send("Successful")
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;