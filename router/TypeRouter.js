const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const TypeController = require('./../controllers/TypeController');

//GET ALL
router.get('/', async (req, res, next) => {
    try {
        let types = await TypeController.getAll();
        types = types.map((el, index) => {
            return {
                _id: el._id,
                nameType: el.nameType,
                index: index + 1,
            }
        });
        res.render('type/typeList', { ty: types });
        console.log(types);
    } catch (error) {
        console.log(error);
    }
});

//INSERT
router.get('/new', (req, res) => {
    res.render('type/typeNew');
});

router.post('/new', async (req, res) => {
    try {
        const { nameType } = req.body;
        await TypeController.insert(nameType); 
        res.redirect("/types"); 
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;