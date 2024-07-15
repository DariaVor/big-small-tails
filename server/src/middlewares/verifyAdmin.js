// middleware/verifyAdmin.js
const { User } = require('../../db/models');

const verifyAdmin = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const user = await User.findByPk(userId);

    if (!user || user.roleId !== 2) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    next();
  } catch (error) {
    console.error('Error in verifyAdmin middleware:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { verifyAdmin };
