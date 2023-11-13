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

router.post('/check', async (req, res, next) => {
    try {
        let { id } = req.body;
        let users = await UserController.check(id);

        res.send(users);
        console.log(users);
    } catch (error) {
        console.log("Error in getAll():", error);
    }
});

router.get('/:id/changeStatus', async (req, res, next) => {
    const _id = req.params.id;
    try {
        const user = await UserController.getById(_id);
        if (user) {
            const newStatus = !user.status; // Đảo ngược trạng thái hiện tại
            await UserController.updateStatus(_id, newStatus);
            console.log(`Change status of User ${_id} to ${newStatus ? 'activated' : 'deactivated'}`);
        }
        res.redirect("/users");
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;