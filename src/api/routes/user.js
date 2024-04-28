const express = require('express');
const router = express.Router();

//lấy ra hàm xử lý
const userController = require('../controllers/user');

router.get("/all-users", userController.getAllUsers);
router.get("/:userId", userController.getAUser);
router.patch("/update-user/:userId", userController.updateUser);

module.exports = router;
