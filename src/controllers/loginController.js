const User = require('../models/User');

exports.login = async (req, res) => {
  const { username } = req.body;

  // Check if username is provided
  if (!username) {
    return res.status(400).json({
      message: 'Username is required',
    });
  }

  // Find user
  const user = await User.findOne({
    username: username.toLowerCase(),
  });

  // User not found
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  // Store user ID in cookie
  res.cookie('userId', user._id);

  // Success response
  res.json({
    message: 'Login successful',
    user,
  });
};