const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

let UserController = require('./../controllers/UserController');

router.get('/', async (req, res, next) => {
    try {
        let users = await UserController.getAll();
        users = users.map((el, index) => {
            return {
                _id: el._id,
                googleId: el.googleId,
                displayName: el.displayName,
                email: el.email,
                index: index + 1,
            }
        });
        res.render('userList', { us : users });
        console.log(users);
    } catch (error) {
        console.log("Error in getAll():", error);
    }
});


module.exports = router;