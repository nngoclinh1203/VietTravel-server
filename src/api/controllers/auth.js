const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

//api/auth/signup
exports.signup = async (req, res) => {
    try {
        const { username, email, password, numberPhone, role } = req.body;

        if (!username || !email || !password || !numberPhone || !role)
            return res.status(400).json({ message: "All input is required!" });

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            userId: uuidv4(), 
            username,
            email,
            numberPhone,
            password: hashedPassword,
            role,
        });

        console.log(user);

        await user.save();
        res.status(201).json({ message: "User created successfully!" });
    
    } catch (err) {
        res.status(500).json(err);
    }
}

//api/auth/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "All input is required!" });

        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found!" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: "Wrong password!" });
        
        // const accessToken = jwt.sign(
        //     { id: user._id, role: user.role },
        //     process.env.ACCESS_TOKEN_SECRET
        // );

        res.status(200).json({
            // message: "Login successfully!",
            user: {
                userId: user.userId,
                username: user.username,
                email: user.email,
                numberPhone: user.numberPhone,
                role: user.role,
                avatar: user.avatar,
                numOfVisitedSites: user.numOfVisitedSites,
                numOfLiked: user.numOfLiked,
                comments: user.comments

            },
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
}

//api/auth/logout
exports.logout = async (req, res) => {
    try {
        res.status(200).json({ message: "Logout successfully!" });
    } catch (err) {
        res.status(500).json(err);
    }
}

