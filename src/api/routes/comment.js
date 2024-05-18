const commentController = require("../controllers/comment");

const router = require("express").Router();

router.post("/add-comment", commentController.addComment);
router.get("/get-comments/:historySiteId", commentController.getCommentsHistoricalSite);
router.get("/all-comments", commentController.getAllComments);
router.delete("/delete-comment/:commentId", commentController.deleteComment);
module.exports = router;