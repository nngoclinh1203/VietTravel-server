const userController = require("../controllers/userController");

const router = require("express").Router();

// ADD A USER
router.post("/", userController.addUser);

//GET ALL USER
router.get("/", userController.getAllUsers);

//GET A USER
router.get("/:id", userController.getAUser);

//UPDATE A  USER
router.put("/:id", userController.updateUser);

//DELETE A USER
// router.delete("/:id", userController.deleteUser);

module.exports = router;