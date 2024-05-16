const  Comment  = require("../model/comment");
const HistoricalSite = require('../model/historicalSites');
const  User  = require("../model/user");
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
        user.numOfVisitedSites = user.numOfVisitedSites + 1;

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

        console.log(historicalSiteId);

        const historicalSite = await HistoricalSite.findOne({ historySiteId: historicalSiteId });
        if (!historicalSite) return res.status(404).json({ message: "Historical Site not found!" });

        const comments = await Comment.find({ historicalSiteId: historicalSiteId });
        if (!comments) return res.status(404).json({ message: "Comments not found!" });

        res.status(200).json(comments);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

//api/comments/like-unlike-comment
exports.likeUnlikeComment = async (req, res) => {
    try {
        const { commentId, userId } = req.body;

        if (!commentId || !userId) {
            if (!commentId) return res.status(400).json({ message: "Comment Id is required!" });
            if (!userId) return res.status(400).json({ message: "User Id is required!" });
        }

        const comment = await Comment.findOne({ commentId: commentId });
        if (!comment) return res.status(404).json({ message: "Comment not found!" });

        const user = await User.findOne({ userId: userId });
        if (!user) return res.status(404).json({ message: "User not found!" });

        let isLiked = comment.peopleLiked.includes(userId);

        if (isLiked) {
            comment.peopleLiked = comment.peopleLiked.filter((id) => id !== userId);
            comment.numberOfLikes = comment.numberOfLikes - 1;
            user.numOfLiked = user.numOfLiked - 1;
        } else {
            comment.peopleLiked.push(userId);
            comment.numberOfLikes = comment.numberOfLikes + 1;
            user.numOfLiked = user.numOfLiked + 1;
            isLiked = true;
        }

        await user.save();
        await comment.save();
        res.status(200).json({ message: "Like/Unlike successfully!" , isLiked: isLiked});

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

//api/comments/voteHistoricalSite
exports.voteHistoricalSite = async (req, res) => {
    try {
        const { userId, placeId, ratePlace } = req.body;

        if (!userId || !placeId || !ratePlace) {
            if (!userId) return res.status(400).json({ message: "User Id is required!" });
            if (!placeId) return res.status(400).json({ message: "Place Id is required!" });
            if (!ratePlace) return res.status(400).json({ message: "Rate is required!" });
        }

        const historicalSite = await HistoricalSite.findOne({ historySiteId: placeId });
        if (!historicalSite) return res.status(404).json({ message: "Historical Site not found!" });

        const user = await User.findOne({ userId: userId });
        if (!user) return res.status(404).json({ message: "User not found!" });

        user.ratedPlaces.push(placeId);

        const listCommentPlaces = await Comment.find({ historicalSiteId: placeId });

        let totalRate = 0;

        for (let i = 0; i < listCommentPlaces.length; i++) {
            if (listCommentPlaces[i].userId === userId) {
                totalRate += listCommentPlaces[i].rate;
            }
        }

        let avrRate = (totalRate + ratePlace)/ (listCommentPlaces.length + 1);

        user.numOfVisitedSites = user.numOfVisitedSites + 1;
        user.numOfLiked = user.numOfLiked + 1;
        
        historicalSite.rate = avrRate;

        await user.save();
        await historicalSite.save();
        res.status(200).json({ message: "Vote successfully!" });
        

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}
// module.exports = commentController;