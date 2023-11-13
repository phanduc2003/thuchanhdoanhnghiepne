const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment-timezone');

const router = express.Router();
const Report = require('./../model/Report');

let ReportController = require('./../controllers/ReportController');
let uploadMiddleware = require('../middleware/upload');

router.get('/', async (req, res) => {
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

router.get('/rp', async (req, res, next) => {
    try {
        let reports = await ReportController.getAll();
        res.send(reports)
        console.log(reports);
    } catch (error) {
        console.log("Error in getAll():", error);
    }
});

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
    res.render('service_report/reportNew');
});

//HANDLE INSERT ENEMY
router.post('/new', [uploadMiddleware.single('image'),], async (req, res, next) => {
    try {
        let { reportType, originOfReport, nameOfSender, nameOfRecipient, address, describe, image, date, sendTime, receiveTime, doneTime, note, evaluate, status } = req.body;
        // image = file ? file.filename : '';
        await ReportController.insert(reportType, originOfReport, nameOfSender, nameOfRecipient, address, describe, image, date, sendTime, receiveTime, doneTime, note, evaluate, status);
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


//DELETE
router.get('/:id/deleteById', async (req, res, next) => {
    let _id = req.params.id;
    try {
        await ReportController.deleteById(_id);
        console.log("Delete OK");
        res.redirect("/reports");
    } catch (error) {
        console.log(error);
    }
});

//UPDATE
router.get('/:id/edit', async function (req, res, next) {
    let _id = req.params.id;
    try {
        let reports = await ReportController.getById(_id);
        res.render('service_report/reportEdit', { rp : reports });
    } catch (error) {
        console.log(error);
    }
});

//HANDLE UPDATE
router.post('/:id/edit', [uploadMiddleware.array('images', 5)], async function (req, res, next) {
    let _id = req.params.id;
    try {
        let { files } = req;
        let { reportType, address, describe, evaluate, timeDone, timeStamp, note } = req.body;
        let existingImages = req.body.existingImages.split(',');

        let images;
        if (files.length > 0) {
            // Nếu có hình ảnh mới, sử dụng danh sách tên hình ảnh mới
            images = files.map(file => file.filename);
        } else {
            // Nếu không có hình ảnh mới, sử dụng danh sách tên hình ảnh hiện có
            images = existingImages;
        }
        await ReportController.update(_id, reportType, address, describe, images, evaluate, timeDone, timeStamp, note);
        res.redirect(`/reports`);
    } catch (error) {
        console.log(error); 
    }
});

router.get('/:id/changeStatus', async (req, res, next) => {
    const _id = req.params.id;
    try {
        const report = await ReportController.getById(_id);
        if (report) {
            const newStatus = !report.status; // Đảo ngược trạng thái hiện tại
            await ReportController.updateStatus(_id, newStatus);
            console.log(`Change status of report ${_id} to ${newStatus ? 'activated' : 'deactivated'}`);
        }
        res.redirect("/reports");
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;