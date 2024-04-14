const { Comment } = require("../model/model");

const commentController = {
    addComment: async (req, res) => {
        try {
            const newComment = new Comment(req.body);
            const savedComment = await newComment.save();
            res.status(200).json(savedComment);

        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = commentController;