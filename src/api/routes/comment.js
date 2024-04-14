const commentController = require("../controllers/comment");

const router = require("express").Router();

router.post("/", commentController.addComment);

module.exports = router;