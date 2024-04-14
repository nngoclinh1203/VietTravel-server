const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    try {
        const { username, email, password, numberPhone } = req.body;

        if (!username || !email || !password || !numberPhone)
            return res.status(400).json({ message: "All input is required!" });

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            username,
            email,
            numberPhone,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: "User created successfully!" });
    
    } catch (err) {
        res.status(500).json(err);
    }
}
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
            message: "Login successfully!",
            // accessToken
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
}
exports.logout = async (req, res) => {
    try {
        res.status(200).json({ message: "Logout successfully!" });
    } catch (err) {
        res.status(500).json(err);
    }
}

