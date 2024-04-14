const { HistoricalSite, User, Comment } = require("../model/model");

const userController = {
    addUser: async (req, res) => {
        try {
            const newUser = new User(req.body);
            const savedUser = await newUser.save();
            res.status(200).json(savedUser);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const allUsers = await User.find();
            res.status(200).json(allUsers);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //GET A USER
    getAUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //UPDATE USER
    updateUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            await user.updateOne({ $set: req.body });
            res.status(200).json("Updated successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE USER
    // deleteUser: async (req, res) => {
    //     try {
    //         await Comment.updateMany(
    //             { Users: req.params.id },
    //             { $pull: { books: req.params.id } }
    //         );
    //         await User.findByIdAndDelete(req.params.id);
    //         res.status(200).json("Deleted successfully");
    //     } catch (err) {
    //         res.status(500).json(err);
    //     }
    // },
}

module.exports = userController;