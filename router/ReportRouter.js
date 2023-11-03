const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

let ReportController = require('./../controllers/ReportController');
let uploadMiddleware = require('../middleware/upload');

router.get('/', async (req, res) => {
    try {
        let reportnes = await ReportController.getAll();
        reportnes = reportnes.map((el, index) => {
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
        res.render('service_report/reportList', { rp : reportnes });
        console.log(reportnes);
    } catch (error) {
        console.log("Error in getAll():", error);
    }
});

//INSERT 
router.get('/new', (req, res) => {
    res.render('service_report/reportNew');
});

//HANDLE INSERT 
router.post('/new', [uploadMiddleware.array('images', 5)], async (req, res, next) => {
    try {
        let { files } = req; // Sử dụng files thay vì file
        let status = req.body.status ? true : false;
        let { reportType, address, describe, image, evaluate, timeDone, timeStamp, note } = req.body;
        //let images = files.map(file => file.filename); // Sử dụng map để lấy danh sách tên file
        await ReportController.insert(reportType, address, describe, image, evaluate, timeDone, timeStamp, note, status);
        res.redirect('/reports');
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
module.exports = router;