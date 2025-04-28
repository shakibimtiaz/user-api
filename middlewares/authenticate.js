// middlewares/authenticate.js

const User = require('../models/user');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided. Access denied.' });
    }

    const token = authHeader.trim(); // only token, no Bearer

    const user = await User.findOne({ authToken: token });

    if (!user) {
      return res.status(401).json({ message: 'Invalid token. Access denied.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = authenticate;
