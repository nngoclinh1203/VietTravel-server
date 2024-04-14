const commentController = require("../controllers/commentController");

const router = require("express").Router();

router.post("/", commentController.addComment);

module.exports = router;