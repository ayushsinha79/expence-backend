const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        const { name, username } = req.body;

        const existingUser = await User.findOne({
            username: username.toLowerCase(),
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Username already exists",
            });
        }

        const user = await User.create({
            name,
            username,
        });

        return res.status(201).json({
            success: true,
            data: user,
            message: "User created successfully",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('transactions');

        res.status(200).json({
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate('transactions');

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            data: user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.verifyUserCode = async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: 'Code is required'
            });
        }

        const user = await User.findOne({
            code: code.toUpperCase()
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Invalid code'
            });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                code: user.code,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};