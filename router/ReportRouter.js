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
        res.render('reportList', { rp : reportnes });
        console.log(reportnes);
    } catch (error) {
        console.log("Error in getAll():", error);
    }
});

//INSERT 
router.get('/new', (req, res) => {
    res.render('reportNew');
});

//HANDLE INSERT 
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
router.post('/:id/edit', [uploadMiddleware.single('image'), ], async function (req, res, next) {
    let _id = req.params.id;
    try {
        let { file } = req;
        let { reportType, address, describe, image, evaluate, timeDone, timeStamp, note } = req.body;
        if (file) {
            image = file.filename;
        }else{
            image = image;
        } 
        await ReportController.update(_id, reportType, address, describe, image, evaluate, timeDone, timeStamp, note);
        res.redirect(`/reports`);
    } catch (error) {
        console.log(error); 
    }
});
module.exports = router;