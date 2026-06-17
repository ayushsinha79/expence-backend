const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
    try {
        const userId = req.cookies.userId;

        if (!userId) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({
                message: 'User not found'
            });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};
