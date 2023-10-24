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
                photo: el.photo,
                email: el.email,
                displayName: el.displayName,
                role: el.role,
                status: el.status,
                index: index + 1,
            }
        });
        res.render('userList', { us: users });
        console.log(users);
    } catch (error) {
        console.log("Error in getAll():", error);
    }
});


module.exports = router;