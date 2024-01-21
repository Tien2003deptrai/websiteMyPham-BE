const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken = (_id, role) => {
    const jwtKey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ _id: _id, role: role }, jwtKey, { expiresIn: '1h' });
}


const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        let user = await userModel.findOne({ email });

        if (user) return res.status(400).json('User with given email already exists');

        if (!name || !email || !password || !role)
            return res.status(400).json('All fields are required');

        if (!validator.isEmail(email))
            return res.status(400).json('Email must be a valid email...');

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json('Password must be a strong password...');
        }

        user = new userModel({ name, email, password, role });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = createToken(user._id, user.role);

        res.header("x-auth-token", token);
        es.json({ message: "Success signup" });

        res.status(200).json({ _id: user._id, name, email, role, token });

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await userModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(500).json({ message: 'Invalid email or password' });
        }

        const token = createToken(user._id, user.role);

        res.cookie("accessToken", token);

        res.status(200).json({
            message: "Success login",
            _id: user._id, name: user.name, email, role: user.role, token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
};