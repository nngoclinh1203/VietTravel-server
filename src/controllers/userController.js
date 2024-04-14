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
    }
}

module.exports = userController;