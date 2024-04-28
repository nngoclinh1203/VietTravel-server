const Comment = require("../model/comment");
const HistoricalSite = require('../model/historicalSites');
const User = require("../model/user");
const { v4: uuidv4 } = require('uuid');

// const commentController = {
//     addComment: async (req, res) => {
//         try {
//             const newComment = new Comment(req.body);
//             const savedComment = await newComment.save();
//             res.status(200).json(savedComment);

//         } catch (err) {
//             res.status(500).json(err);
//         }
//     }
// }

//api/comments/add-comment
exports.addComment = async (req, res) => {
    try {
        const { userId, placeId, data } = req.body;

        if (!userId || !placeId || !data) {
            if (!userId) return res.status(400).json({ message: "User Id is required!" });
            if (!placeId) return res.status(400).json({ message: "Place Id is required!" });
            if (!data) return res.status(400).json({ message: "Data is required!" });
        }

        const comment = {
            commentId: uuidv4(),
            userId: userId,
            historicalSiteId: placeId,
            content: data
        }

        console.log(HistoricalSite, User);

        const historicalSite = await HistoricalSite.findOne({ historySiteId: placeId });
        if (!historicalSite) return res.status(404).json({ message: "Historical Site not found!" });

        const user = await User.findOne({ userId: userId });
        if (!user) return res.status(404).json({ message: "User not found!" });


        console.log(comment);
        console.log(historicalSite);
        console.log(user);

        const newComment = new Comment(comment);
        const savedComment = await newComment.save();

        console.log(savedComment);
        console.log(newComment);

        historicalSite.comments.push(savedComment);
        user.comments.push(savedComment);

        await historicalSite.save();
        await user.save();

        res.status(201).json({ message: "Comment added successfully!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

//api/comments/get-comments/:historySiteId
exports.getCommentsHistoricalSite = async (req, res) => {
    try {
        const historicalSiteId = req.params.historySiteId;

        const historicalSite = await HistoricalSite.findOne({ historySiteId: historicalSiteId });
        if (!historicalSite) return res.status(404).json({ message: "Historical Site not found!" });

        const comments = await Comment.find({ historicalSiteId: historicalSiteId });
        if (!comments) return res.status(404).json({ message: "Comments not found!" });

        const newComments = await Promise.all(comments.map(async comment => {
            const user = await User.findOne({ userId: comment.userId });
            console.log(user.avatar);
        
            if (user) {
                return {
                    commentId: comment.commentId,
                    content: comment.content,
                    time: comment.time,
                    avatar: user.avatar,
                    username: user.username
                };
            } 
        }));        

        res.status(200).json(newComments);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}


// module.exports = commentController;