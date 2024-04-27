const commentController = require("../controllers/comment");

const router = require("express").Router();

router.post("/add-comment", commentController.addComment);
router.get("/get-comments/:historySiteId", commentController.getCommentsHistoricalSite);

module.exports = router;