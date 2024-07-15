const { User } = require('../../db/models');

const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(res.locals.user.id);
    if (user.roleId !== 2) {
      return res.status(403).send('Forbidden');
    }
    next();
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};

module.exports = { verifyAdmin };
